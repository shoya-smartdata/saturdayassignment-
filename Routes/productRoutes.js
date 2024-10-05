const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../Controllers/productController');
const { isAdmin } = require('../authentication/auth'); // Middleware to check admin role
const router = express.Router();

// Create a new product (admin only)
router.post('/', isAdmin, createProduct);

// Get all products
router.get('/', getAllProducts);

// Get a specific product by ID
router.get('/:id', getProductById);

// Update a product (admin only)
router.put('/:id', isAdmin, updateProduct);

// Delete a product (admin only)
router.delete('/:id', isAdmin, deleteProduct);

module.exports = router;
