const express = require('express');
const {
  addToCart,
  viewCart,
  updateCartItem,
  removeCartItem,
} = require('../Controllers/cartController');
const { isAuthenticated } = require('../authentication/auth'); // Middleware to check authentication
const router = express.Router();

// Add product to cart
router.post('/', isAuthenticated, addToCart);

// View cart
router.get('/', isAuthenticated, viewCart);

// Update product quantity in cart
router.put('/:productId', isAuthenticated, updateCartItem);

// Remove product from cart
router.delete('/:productId', isAuthenticated, removeCartItem);

module.exports = router;
