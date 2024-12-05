const qs = require('qs');
const crypto = require('crypto-js');
const OrderModel = require('../../models/ordersModels/order');
const TransactionModel = require('../../models/transactionModel/transaction');
const OrderDetails = require('../../models/orderDetailsModel/orderDetails');
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
const Vnpay = {
  createPaymentUrl: async (req, res) => {
    // console.log(req.body);
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const tmnCode = process.env.VNP_TmnCode;
    const secretKey = process.env.VNP_HashSecret;
    const vnpUrl = process.env.VNP_Url;
    const returnUrl = process.env.VNP_ReturnUrl;

    const date = new Date();
    const createDate = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(
      -2
    )}${('0' + date.getHours()).slice(-2)}${('0' + date.getMinutes()).slice(-2)}${('0' + date.getSeconds()).slice(-2)}`;
    const orderId = req.body.orderId;
    const amount = parseInt(req.body.amount) * 100;
    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    const locale = req.body.language || 'vn';
    const currCode = 'VND';
    let vnp_Params = {};

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    vnp_Params = sortObject(vnp_Params);
    // Tạo chữ ký bảo mật
    const signData = qs.stringify(vnp_Params, { encode: false });
    const signed = crypto.HmacSHA512(signData, secretKey).toString();
    vnp_Params['vnp_SecureHash'] = signed;
    console.log(vnp_Params['vnp_SecureHash']);

    const querystring = qs.stringify(vnp_Params, { encode: false });
    const paymentUrl = `${vnpUrl}?${querystring}`;
    res.json({ paymentUrl });
  },

  handleVnpayReturn: async (req, res) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    const sortedParams = sortObject(vnp_Params);

    const secretKey = process.env.VNP_HashSecret;
    const signData = qs.stringify(sortedParams, { encode: false });
    const signed = crypto.HmacSHA512(signData, secretKey).toString();
    vnp_Params['vnp_SecureHash'] = signed;
    // Tạo chữ ký bảo mật
    if (secureHash === signed) {
      const orderId = vnp_Params['vnp_TxnRef'];
      if (vnp_Params['vnp_ResponseCode'] == '00') {
        const newOrderUpdate = await OrderModel.findByIdAndUpdate(orderId, { isPay: true }, { new: true });
        if (newOrderUpdate) {
          const { payment_method_id, status, total_price } = newOrderUpdate;
          const transaction_id = vnp_Params['vnp_TransactionNo'];
          const transaction_type = 'payment';
          const response_code = vnp_Params['vnp_TransactionStatus'];
          const description = vnp_Params['vnp_OrderInfo'];

          const newTransaction = new TransactionModel({
            transaction_id,
            transaction_type,
            response_code,
            order_id: orderId,
            payment_method_id,
            description,
            currency: 'VND',
            status,
            amount: total_price
          });

          await newTransaction.save();
          return res.redirect(process.env.URL_CLIENT);
        }
      } else {
        const { payment_method_id, _id, status, total_price } = newOrderUpdate;
        const transaction_id = vnp_Params['vnp_TransactionNo'];
        const transaction_type = 'payment';
        const response_code = vnp_Params['vnp_TransactionStatus'];
        const description = vnp_Params['vnp_OrderInfo'];

        const order_id = _id;

        const newTransaction = new TransactionModel({
          transaction_id,
          transaction_type,
          response_code,
          order_id,
          payment_method_id,
          description,
          currency: 'VND',
          status,
          amount: total_price
        });

        await newTransaction.save();
        return res.redirect(process.env.URL_CLIENT);
      }
    } else {
      const orderId = vnp_Params['vnp_TxnRef'];
      const orderDelete = await OrderModel.findByIdAndDelete(orderId);
      if (orderDelete) {
        await OrderDetails.deleteMany({ order_id: orderId });
      }
      return res.redirect(process.env.URL_CLIENT);
    }
  },
  querydr: async (req, res) => {}
};

module.exports = Vnpay;
