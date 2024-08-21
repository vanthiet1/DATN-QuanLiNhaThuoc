const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require('./db/connectDB')



// Middleware
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
connectDB()

<<<<<<< HEAD

=======
app.get('/', (req, res) => {
    res.send("Welcome To Api");
});
>>>>>>> 31e5009ec98171e3720b2336147e1f207235811b

// Routes
const AuthRouter = require('./routers/auth')
const UserRouter = require('./routers/user')
const CartRouter = require('./routers/cart')


app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/cart', CartRouter)




// -- Role 
const roleRouter = require('./routers/role');  
app.use('/api/v1/role', roleRouter);  
// -- Address
const addressRouter = require('./routers/address');
app.use('/api/v1/address', addressRouter);
// -- Coupon
const couponRouter = require('./routers/coupon');
app.use('/api/v1/coupon', couponRouter);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
