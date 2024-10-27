const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require('./db/connectDB');
// Middleware
require('./configs/cron');
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome To Api');
});

// Routes
const AuthRouter = require('./routers/auth');
const OrderRouter = require('./routers/order');
const OrderDetailRouter = require('./routers/orderDetails');
const ImageRouter = require('./routers/image');
const UserRouter = require('./routers/user');
const CartRouter = require('./routers/cart');
const RoleRouter = require('./routers/role');
const AddressRouter = require('./routers/address');
const CouponRouter = require('./routers/coupon');
const ProductRouter = require('./routers/product');
const CategoryRouter = require('./routers/category');
const SubCategoryRouter = require('./routers/subCategory');
const BrandRouter = require('./routers/brand');
const BannerRouter = require('./routers/banner');
const BlogRouter = require('./routers/blog');
const CommentRouter = require('./routers/comments');
const VerifyRouter = require('./routers/vertifyEmail');
const PharmacyRouter = require('./routers/pharmacy');
<<<<<<< HEAD
const SearchRouter = require('./routers/search');

=======
const PaymentMethodRouter = require('./routers/paymentMethod');
const VnpayRouter = require('./routers/vnpay');
const TransactionRouter = require('./routers/transaction');
const ReportRouter = require('./routers/report');
>>>>>>> 8ac3b2a5dd387556fda7502a0875d4466340b860

app.use('/api/v1/order', OrderRouter);
app.use('/api/v1/order-details', OrderDetailRouter);
app.use('/api/v1/image', ImageRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/cart', CartRouter);
app.use('/api/v1/role', RoleRouter);
app.use('/api/v1/address', AddressRouter);
app.use('/api/v1/coupon', CouponRouter);
app.use('/api/v1/image', ImageRouter);
app.use('/api/v1/category', CategoryRouter);
app.use('/api/v1/subCategory', SubCategoryRouter);
app.use('/api/v1/product', ProductRouter);
app.use('/api/v1/brand', BrandRouter);
app.use('/api/v1/banner', BannerRouter);
app.use('/api/v1/blog', BlogRouter);
app.use('/api/v1/comment', CommentRouter);
app.use('/api/v1/email', VerifyRouter);
app.use('/api/v1/pharmacy', PharmacyRouter);
<<<<<<< HEAD
app.use('/api/v1/search', SearchRouter);
=======
app.use('/api/v1/payment-method', PaymentMethodRouter);
app.use('/api/v1/vnpay', VnpayRouter);
app.use('/api/v1/transactions', TransactionRouter);
app.use('/api/v1/report', ReportRouter);
>>>>>>> 8ac3b2a5dd387556fda7502a0875d4466340b860

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
