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
const HistoryOrder = require('../../models/historyOrderModel/historyOrder')
const PaymentMethodModel = require('../../models/paymentMethodModel/paymentMethod');
const OrderDetailModel = require('../../models/orderDetailsModel/orderDetails');
const sendMail = require('../../helpers/sendMail');
const sendReminderEmail = require('../../helpers/notification')

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
    const { status, isPay } = req.body;
    try {
      const currentOrder = await OrderModel.findById(id);
      if (!currentOrder) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }
      if (status == 4) {
        const order = await OrderModel.findByIdAndUpdate(id, { status, isPay: true }, { new: true });
        return res.status(200).json(order);
      } else if (status == 5) {
        const order = await OrderModel.findByIdAndUpdate(id, { status, isPay: isPay }, { new: true })
        const existingHistory = await HistoryOrder.findOne({
          order_id: id,
          status_to: status
        });
        if (!existingHistory) {
          await HistoryOrder.create({
            order_id: id,
            status_from: currentOrder.status,
            status_to: status,
            note: '',
            updated_by_user_id: id
          });
        }
        return res.status(200).json(order);
      }
      const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
      if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  sendMailCancelOrder: async (req, res) => {
    try {
      const { email, isPay, total_price, payment_method_id } = req.body;
      const formattedPrice = `${Number(total_price).toLocaleString('vi-VN')}`;
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 30px auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #2563EB; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Thông báo hoàn tiền</h1>
          </div>
          <div style="padding: 40px; text-align: center; background-color: #ffffff;">
              <img src="https://res.cloudinary.com/dz93cdipw/image/upload/v1733052072/DATN_QuanLiNhaThuoc/lfriluyngwydd2ri21ey.png" alt="Logo Bình An Dược" style="width: 120px; margin-bottom: 20px;">
              <p style="color: #333333; font-size: 18px; line-height: 1.8; margin: 0 0 25px;">
                  Kính gửi quý khách,  
                  <br><br>
                  Đơn hàng của quý khách đã được hủy thành công. Với số tiền quý khách đã thanh toán là <strong>${formattedPrice} VND</strong>, chúng tôi sẽ tiến hành hoàn tiền trong vòng <strong>3 ngày làm việc</strong>.  
              </p>
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                  Nếu có bất kỳ thắc mắc nào, quý khách vui lòng liên hệ với chúng tôi qua số điện thoại <strong>0349850070</strong> hoặc ghé thăm website để biết thêm chi tiết.  
              </p>
              <a href="https://nha-thuoc-binh-an-duoc.vercel.app" 
                 style="display: inline-block; padding: 12px 30px; background-color: ##2563EB; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px;">
                  Ghé thăm website của chúng tôi
              </a>
          </div>
          <div style="background-color: #F0F4FA; padding: 20px; text-align: center; color: #555555; font-size: 14px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0;">&copy; 2024 Bình An Dược. Mọi quyền được bảo lưu.</p>
          </div>
      </div>
      `;

      const payment = await PaymentMethodModel.findOne({ _id: payment_method_id })
      const subject = "Hoàn tiền đơn bị hủy";
      if (isPay !== true && payment?.code !== "mb") {
        return
      }
      await sendReminderEmail({ email, subject, htmlContent })
      res.status(200).json({ message: "Gửi thành công" })
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
  },

  sendMailOrderSuccsess: async (req, res) => {
    try {
      const { order, email } = req.body;
      const formattedPrice = `${Number(order.total_price).toLocaleString('vi-VN')}`;
      const orderDetail = await OrderDetailModel.find({ order_id: order?._id })
      const products = [];
      for (const order of orderDetail) {
        const product = await ProductModel.find({ _id: order.product_id });
        products.push(...product);
      }

      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 30px auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #2563EB; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Thông báo đặt hàng thành công</h1>
    </div>
    <div style="padding: 40px 40px 0px 40px; text-align: center; background-color: #ffffff;">
        <img src="https://res.cloudinary.com/dz93cdipw/image/upload/v1733052072/DATN_QuanLiNhaThuoc/lfriluyngwydd2ri21ey.png" alt="Logo Bình An Dược" style="width: 120px; margin-bottom: 20px;">
        <p style="color: #333333; font-size: 18px; line-height: 1.8; margin: 0 0 25px;">
            Kính gửi quý khách,  
            <br><br>
            Đơn hàng của quý khách đã được đặt thành công. Tổng số tiền thanh toán là <strong>${formattedPrice} VND</strong> Quý khách sẽ nhận được thông báo khi đơn hàng được xử lý và giao đến địa chỉ của mình trong thời gian sớm nhất.  
        </p>
    </div>
    <div style="padding: 0px 20px 20px 20px; text-align: left; background-color: #ffffff;">
        <h2 style="font-size: 24px; margin-bottom: 20px; color: #333;">Thông tin sản phẩm</h2>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e0e0e0;">
            <thead>
                <tr>
                    <th style="padding: 10px; background-color: #2563EB; color: white; border: 1px solid #e0e0e0; text-align: left;">Tên sản phẩm</th>
                    <th style="padding: 10px; background-color: #2563EB; color: white; border: 1px solid #e0e0e0; text-align: left;">Mô tả</th>
                    <th style="padding: 10px; background-color: #2563EB; color: white; border: 1px solid #e0e0e0; text-align: left;">Giá tiền</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${product.name}</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${product.description_short}</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${ Number(product.price_distcount).toLocaleString('vi-VN')} VND</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    <div style="background-color: #F0F4FA; padding: 20px; text-align: center; color: #555555; font-size: 14px; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0;">&copy; 2024 Bình An Dược. Mọi quyền được bảo lưu.</p>
    </div>
</div>
    `;
      const subject = "Đơn hàng của bạn đã đặt thành công";
      await sendReminderEmail({ email, subject, htmlContent })
      res.status(200).json({ message: "Gửi thành công" })
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
  },

  updatePayOrder: async (req, res) => {
    const { id } = req.params;
    const { isPay } = req.body;
    try {
      if (!id) {
        return res.status(400).json({ message: "Không tìm thấy id sẳn phẩm" })
      }
      const order = await OrderModel.findByIdAndUpdate(id, { isPay: isPay }, { new: true });
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  processPaymentDifference: async (req, res) => {
    try {
      const { email, subject, insufficientPayment, actionMoney } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Không tìm thấy email" })
      }
      await sendMail({
        email: email,
        subject: subject,
        randomCode: `
             <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p style="font-size: 16px; margin-bottom: 20px;">Chào bạn <strong>${email}</strong>,</p>
          <h1 style="font-size: 24px; color: #2563EB; margin-bottom: 10px;">${subject}</h1>
          <p style="font-size: 14px; margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9; color: #555;">
            <strong>${actionMoney}</strong> ${insufficientPayment} VNĐ
          </p>
          <p style="font-size: 14px; margin-bottom: 20px;">
             Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua:
          </p>
          <p style="font-size: 14px; margin-bottom: 20px;">
            <strong>Điện thoại:</strong> 0340850070<br>
            <strong>Email:</strong> binhanduoc@gmail.com
          </p>
          <p style="font-size: 14px; margin-top: 30px; text-align: center; color: #888;">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
          </p>
        </div>
              `
      });
      res.status(200).json({ message: "Gửi thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
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
