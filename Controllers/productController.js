const Product = require('../Models/productSchema');
const Category = require('../Models/categoryModel');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, categoryId, imageUrl } = req.body;
    const product = await Product.create({ name, price, description, quantity, categoryId, imageUrl });
    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Error creating product', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: Category, as: 'category' }] });
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product', error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price, description, quantity, categoryId, imageUrl } = req.body;
    product.name = name;
    product.price = price;
    product.description = description;
    product.quantity = quantity;
    product.categoryId = categoryId;
    product.imageUrl = imageUrl;

    await product.save();
    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Error updating product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting product', error });
  }
};
