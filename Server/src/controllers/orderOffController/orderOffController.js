const OrderModel = require('../../models/ordersModels/order');
const AddressModel = require('../../models/addressModel/address');
const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');
const CouponModel = require('../../models/couponModel/coupon');
const mongoose = require('mongoose');
const PaymentMethodModel = require('../../models/paymentMethodModel/paymentMethod');
const UserModel = require('../../models/userModel/user');
const ProductModel = require('../../models/productModel/product');
const { handleCreateImageUpload } = require('../../services/mediaCloudinary');
const formatHelper = require('../../utilities/helper/formatHelper');

const OrderOffControll = {
  createOrder: async (req, res) => {
    try {
      // khi sử dụng formData -> req.body sẽ trả về json vì thế cần pasre các đối tượng
      const { address, productCart, payment_method_id, coupon_id, order_date, sale_type, email } = req.body;
      const prescriptionImageFile = req.file;
      const addressParse = JSON.parse(address);
      const { street, district, ward, province, address: address_, receiver, phone, note } = addressParse;
      const productCartParse = JSON.parse(productCart);

      if (!productCartParse || !productCartParse.productList || !Array.isArray(productCartParse.productList)) {
        return res.status(400).json('Giỏ hàng của bạn bị lỗi!');
      }

      const userExist = await UserModel.findOne({ email });
      let user_id = null;

      if (!userExist) {
        // Tạo user nếu không tồn tại
        const password = new Date();
        const fullname = receiver;
        const provider = 'local';
        const role_id = '66c35173d989bc972352ef3d';

        const newUser = new UserModel({
          password,
          fullname,
          phone,
          email,
          provider,
          role_id
        });

        await newUser.save();
        user_id = newUser._id;
      } else {
        user_id = userExist._id;
      }

      // Kiểm tra và thêm địa chỉ mới nếu chưa tồn tại
      const userAddressExist = await AddressModel.findOne({ user_id, street, ward, district, province });
      let userAddressNew = null;

      if (!userAddressExist) {
        const newAddress = new AddressModel({
          user_id,
          street,
          district,
          province,
          address: address_,
          receiver,
          ward,
          phone,
          note
        });
        userAddressNew = await newAddress.save();
      }
      let totalPrice = parseInt(productCartParse.totalPrice);
      let quantity = parseInt(productCartParse.quantity);
      let couponIsReady = null;

      if (coupon_id) {
        couponIsReady = await CouponModel.findOne({ _id: coupon_id, is_active: true });
      }

      if (couponIsReady) {
        totalPrice -= couponIsReady.discount_value;
      }

      let urlCloundCreated = '';
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

      const orderData = {
        user_id,
        order_date,
        total_price: totalPrice,
        total_quantity: quantity,
        sale_type,
        payment_method_id
      };

      if (couponIsReady) {
        orderData.coupon_id = coupon_id;
      }

      if (userAddressNew) {
        orderData.shipping_address_id = userAddressNew._id;
      }

      if (urlCloundCreated) {
        orderData.prescriptionImage = urlCloundCreated;
      }

      const newOrder = new OrderModel(orderData);
      await newOrder.save();

      if (newOrder) {
        if (couponIsReady) {
          const updatedCoupon = await CouponModel.findByIdAndUpdate(
            orderData.coupon_id,
            { is_active: false },
            { new: true }
          );
          updatedCoupon.save();
        }

        const handleSaveOrderDetails = async ({ product_id, quantity, totalPrice }) => {
          const newOrderDetails = new OrderDetailsModel({
            product_id,
            quantity,
            price: totalPrice,
            order_id: newOrder._id
          });
          await newOrderDetails.save();

          const productExist = await ProductModel.findById(product_id);
          if (productExist) {
            const newStock = productExist.stock - quantity;
            await ProductModel.updateOne({ _id: product_id }, { $set: { stock: newStock } });
          }
        };

        // Dùng for...of để đảm bảo chờ tất cả các sản phẩm được lưu vào OrderDetails
        for (const productItem of productCartParse.productList) {
          const { productId, quantity, totalPrice } = productItem;
          await handleSaveOrderDetails({ product_id: productId, quantity, totalPrice });
        }
      }

      res.status(200).json({ newOrder, message: 'Tạo hóa đơn thành công' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = OrderOffControll;
