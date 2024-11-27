const OrderModel = require('../../models/ordersModels/order');
const AddressModel = require('../../models/addressModel/address');
const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');
const CouponModel = require('../../models/couponModel/coupon');
const mongoose = require('mongoose');
const { handleCreateImageUpload } = require('../../services/mediaCloudinary');
const formatHelper = require('../../utilities/helper/formatHelper');
const ProductModel = require('../../models/productModel/product');
const { getIoSocket } = require('../../configs/socket');
const NotificationModel = require('../../models/notificationModel/notificationModel');
const UserModel = require('../../models/userModel/user');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      // dữ liệu gửi lên
      // address , coupon_id, productCart, user_id , payment method , prescriptionImage, order_date , sale_type
      const { address, productCart, payment_method_id, coupon_id, order_date, sale_type, user_id } = req.body;
      const addressParse = JSON.parse(address);

      const { street, district, ward, address: address_, receiver, province, phone, note } = addressParse;
      const { total_quantity, total_price, productList } = JSON.parse(productCart);

      const prescriptionImageFile = req.file;

      if (!productList || (!Array.isArray(productList) && total_quantity && total_price)) {
        return res.status(400).json('Giỏ hàng của bạn bị lỗi!');
      }

      const { ObjectId } = mongoose.Types;
      const user_id_convert = new ObjectId(user_id);
      const payment_method_id_convert = new ObjectId(payment_method_id);

      // kiểm tra xem user đã có địa chỉ chưa ?
      // thêm và cập nhật địa chỉ người mua

      let newUserAddress;
      let userAddressExist = await AddressModel.findOne({ user_id: user_id_convert, address: address_ });
      if (!userAddressExist) {
        newUserAddress = new AddressModel({ ...addressParse, user_id: user_id_convert });
        await newUserAddress.save();
      } else {
        const filterUpdateAddress = {};
        if (userAddressExist.receiver !== receiver) {
          filterUpdateAddress.receiver = receiver;
        }
        if (userAddressExist.phone !== phone) {
          filterUpdateAddress.phone = phone;
        }
        if (userAddressExist.note !== note) {
          filterUpdateAddress.note = note;
        }
        await AddressModel.findOneAndUpdate(
          { _id: userAddressExist._id },
          { ...filterUpdateAddress },
          { new: true, upsert: false }
        );
      }

      const orderState = {
        shipping_address_id: userAddressExist ? userAddressExist?._id : newUserAddress._id,
        user_id: user_id_convert,
        order_date,
        sale_type,
        total_price,
        total_quantity,
        payment_method_id: payment_method_id_convert
      };

      let couponIsReady = null;

      if (coupon_id) {
        couponIsReady = await CouponModel.findOne({ _id: coupon_id, is_active: true });
      }

      if (couponIsReady) {
        orderState.total_price -= couponIsReady.discount_value;
      }

      if (couponIsReady) {
        orderState.coupon_id = couponIsReady._id;
      }

      let urlCloundCreated;

      if (prescriptionImageFile) {
        const b64 = Buffer.from(prescriptionImageFile.buffer).toString('base64');
        let dataURI = `data:${prescriptionImageFile.mimetype};base64,${b64}`;
        const imageName = prescriptionImageFile.originalname.split('.')[0];
        const urlOptions = {
          folder: 'nhathuoc/orders',
          public_id: formatHelper.converStringToSlug(imageName)
        };
        urlCloundCreated = await handleCreateImageUpload(dataURI, urlOptions);
      }

      if (urlCloundCreated) {
        orderState.prescriptionImage = urlCloundCreated;
      }

      const newOrder = new OrderModel(orderState);
      await newOrder.save();

      // tạo hóa đơn chi tiết
      if (newOrder) {
        if (couponIsReady) {
          const updatedCoupon = await CouponModel.findByIdAndUpdate(
            orderState.coupon_id,
            { is_active: false },
            { new: true }
          );
          updatedCoupon.save();
        }

        const handleSaveOrderDetails = async ({ product_id, quantity, price }) => {
          const newOrderDetails = new OrderDetailsModel({ product_id, quantity, price, order_id: newOrder._id });
          await newOrderDetails.save();
          const productExist = await ProductModel.findById(product_id);
          if (productExist) {
            const newStock = productExist.stock - quantity;
            await ProductModel.updateOne({ _id: product_id }, { $set: { stock: newStock } });
          }
        };

        if (productList.length > 0 && Array.isArray(productList)) {
          for (const productItem of productList) {
            const { productId, quantity, totalPriceProduct } = productItem;
            await handleSaveOrderDetails({ product_id: productId, quantity, price: totalPriceProduct });
          }
        }
      }

      if (newOrder) {
        const userInfor = await UserModel.findById(user_id_convert);
        getIoSocket().to('staff').emit('notificationNewOrder', newOrder);
        getIoSocket().to('admin').emit('notificationNewOrder', newOrder);

        if (userInfor) {
          const newNotificationState = {
            type: 'info',
            message: `${userInfor?.fullname} vừa tạo đơn hàng ${newOrder.total_price} vnd`,
            category: 'new order'
          };

          const newNotification = new NotificationModel(newNotificationState);
          await newNotification.save();
        }
      }

      res.status(200).json({ newOrder, message: 'Tạo hóa đơn thành công' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const { customerName, status, page, limit, startDate, endDate, saleType } = req.query;
      const totalItems = await OrderModel.countDocuments();
      const itemOfPage = parseInt(limit) || 8;
      const totalNumberPage = Math.ceil(totalItems / itemOfPage);
      const pageNumber = Number.parseInt(page) || 1;

      const filterConditions = {};

      if (customerName) {
        filterConditions['user.fullname'] = { $regex: customerName, $options: 'i' };
      }

      if (status) {
        filterConditions.status = parseInt(status);
      }

      if (saleType && !saleType !== 'all') {
        filterConditions['sale_type'] = saleType;
      }

      if (startDate && endDate) {
        filterConditions.order_date = {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        };
      }

      const ordersData = await OrderModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'addresses',
            localField: 'shipping_address_id',
            foreignField: '_id',
            as: 'address'
          }
        },
        { $unwind: '$user' },
        { $unwind: '$address' },
        {
          $match: filterConditions
        },
        { $sort: { createdAt: -1 } }
      ])
        .skip((pageNumber - 1) * itemOfPage)
        .limit(itemOfPage);

      if (ordersData) {
        res.status(200).json({ totalItems, totalNumberPage, itemOfPage, ordersData });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    const { id } = req.params;
    const orderConditions = {};
    const { ObjectId } = mongoose.Types;
    const convertId = new ObjectId(id);
    if (id) {
      orderConditions._id = convertId;
    }
    try {
      const order = await OrderModel.aggregate([
        { $match: orderConditions },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'addresses',
            localField: 'shipping_address_id',
            foreignField: '_id',
            as: 'address'
          }
        },
        {
          $lookup: {
            from: 'payment_methods',
            localField: 'payment_method_id',
            foreignField: '_id',
            as: 'payment'
          }
        },
        { $unwind: '$user' },
        { $unwind: '$address' },
        { $unwind: '$payment' }
      ]);
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOrderByUserId: async (req, res) => {
    const { user_id } = req.params;
    try {
      if (!user_id) {
        return res.status(400).json({ message: 'Thiếu thông tin user' });
      }
      const orderUser = await OrderModel.find({ user_id: user_id });
      if (!orderUser) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }
      res.status(200).json(orderUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOrder: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      if (status == 4) {
        const order = await OrderModel.findByIdAndUpdate(id, { status, isPay: true }, { new: true });
        return res.status(200).json(order);
      } else if (status == 5) {
        const order = await OrderModel.findByIdAndUpdate(id, { status, isPay: false }, { new: true });
        return res.status(200).json(order);
      }
      const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updatePayOrder: async (req, res) => {
    const { id } = req.params;
    const { isPay } = req.body;
    try {
      if(!id){
        return res.status(400).json({message:"Không tìm thấy id sẳn phẩm"})
      }
        const order = await OrderModel.findByIdAndUpdate(id, {isPay: isPay }, { new: true });
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  userCancelOrder: async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
      if (!user_id) {
        return res.status(400).json({ message: 'Thiếu thông tin user' });
      }

      const order = await OrderModel.findById(id);
      if (order.user_id.toString() !== user_id) {
        return res.status(400).json({ message: 'Đơn hàng này không phải của bạn không được hủy' });
      }
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status: 2 }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await OrderModel.findByIdAndDelete(id);
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json({ message: 'Xóa đơn hàng thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = OrderController;
