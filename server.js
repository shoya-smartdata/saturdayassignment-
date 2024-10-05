const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRouters');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
// const orderRoutes = require('./Routes/orderRoutes');
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
// app.use('/orders', orderRoutes);

// Sync the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
