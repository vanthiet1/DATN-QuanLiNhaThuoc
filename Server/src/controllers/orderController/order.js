const OrderModel = require('../../models/ordersModels/order');
const AddressModel = require('../../models/addressModel/address');
const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');
const CouponModel = require('../../models/couponModel/coupon');
const mongoose = require('mongoose');
const PaymentMethodModel = require('../../models/paymentMethodModel/paymentMethod');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      // dữ liệu gửi lên
      // address , coupon_id, productCartList, user , product, payment method , transactions
      const { address, productCart, payment_method_id, coupon_id, order_date, sale_type } = req.body;
      const { street, district, commune, address: address_, receiver, city, phone, note } = address;

      const user_id = '66fd52f76f405e9671989ace';
      const { ObjectId } = mongoose.Types;
      const user_id_convert = new ObjectId(user_id);
      const payment_method_id_convert = new ObjectId(payment_method_id);

      // kiểm tra xem user đã có địa chỉ chưa ?
      // thêm và cập nhật địa chỉ người mua
      const userAddress = await AddressModel.find({ user_id: user_id_convert });
      let newUserAddress;
      let userAddressExist;
      if (userAddress.length === 0) {
        newUserAddress = new AddressModel({
          street,
          district,
          commune,
          address: address_,
          receiver,
          city,
          phone,
          note,
          user_id: user_id_convert
        });

        await newUserAddress.save();
      } else {
        userAddressExist = userAddress.find((item) => {
          return item.address === address_;
        });
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
          { address: userAddressExist.address },
          { ...address, ...filterUpdateAddress },
          { new: true, upsert: false }
        );
      }

      let total_price = productCart.totalPrice;
      const total_quantity = productCart.quantity;

      // check payment method;
      const paymentMethod = await PaymentMethodModel.findById(payment_method_id_convert);
      console.log(paymentMethod);
      if (paymentMethod.name === 'thanh toán khi nhận hàng') {
        // không có transaction
      }

      if (paymentMethod.name === 'thanh toán qua online Vnpay') {
        // có transaction

        if ('thanh toán thành công') {
          // cập nhật status lên 3
        }
      }

      // kiểm tra phiếu giảm giá
      let couponIsReady;
      if (coupon_id) {
        const couponFilter = {
          _id: coupon_id,
          is_active: true
        };
        couponIsReady = await CouponModel.findOne(couponFilter);
        if (couponIsReady) {
          total_price = total_price - couponIsReady.discount_value;
        }
      }

      const orderState = {
        shipping_address_id: newUserAddress ? newUserAddress._id : userAddressExist._id,
        user_id: user_id_convert,
        order_date,
        sale_type,
        total_price,
        total_quantity,
        payment_method_id: payment_method_id_convert
      };

      if (couponIsReady) {
        orderState.coupon_id = couponIsReady._id;
      }

      const newOrder = new OrderModel(orderState);
      await newOrder.save();

      // tạo hóa đơn chi tiết
      if (newOrder) {
        const handleSaveOrderDetails = async ({ product_id, quantity, price }) => {
          const newOrderDetails = new OrderDetailsModel({ product_id, quantity, price, order_id: newOrder._id });
          await newOrderDetails.save();
        };
        // kiểm tra productCart;
        if (productCart.productList.length > 0 && Array.isArray(productCart.productList)) {
          productCart.productList.forEach((productItem) => {
            const { productId, quantity } = productItem;
            const price = 1000000;
            handleSaveOrderDetails({ product_id: productId, quantity, price });
          });
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
        }
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
      const orderUser = await OrderModel.findOne({ user_id: user_id }).populate('user_id').populate('shipping_address');

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
    const { status, payment_method } = req.body;
    try {
      const order = await OrderModel.findByIdAndUpdate(id, { status, payment_method }, { new: true });
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
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
