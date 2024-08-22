const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require('./db/connectDB');

// Middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());
connectDB();

// Routes
const AuthRouter = require('./routers/auth');
const OrderRouter = require('./routers/order');
const OrderDetailRouter = require('./routers/orderDetails');
const ImageRouter = require('./routers/image');


app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/order', OrderRouter);
app.use('/api/v1/order-detail', OrderDetailRouter);
app.use('/api/v1/image',ImageRouter)

app.get('/', (req, res) => {
  res.send('Welcome To Api');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
