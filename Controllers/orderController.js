const Order = require('../Models/orderModel'); // Make sure to create the Order model
const Cart = require('../Models/cartModel');
const Product = require('../Models/productSchema');

exports.placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id } });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalPrice = 0;
    const products = [];

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      totalPrice += product.price * item.quantity;
      products.push({ productId: item.productId, quantity: item.quantity });
    }

    const newOrder = await Order.create({
      userId: req.user.id,
      products: JSON.stringify(products), // Convert to string for storage
      totalPrice,
      status: 'pending',
    });

    // Optionally, you can clear the cart after placing the order
    await Cart.destroy({ where: { userId: req.user.id } });

    return res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Error placing order', error });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Error fetching order', error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Only admin can view all orders
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const orders = await Order.findAll();
    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};
