const Cart = require('../Models/cartModel');
const Product = require('../Models/productSchema');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingCartItem = await Cart.findOne({
      where: { userId: req.user.id, productId },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Cart updated successfully', cartItem: existingCartItem });
    } else {
      const newCartItem = await Cart.create({
        userId: req.user.id,
        productId,
        quantity,
      });
      return res.status(201).json({ message: 'Product added to cart successfully', cartItem: newCartItem });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'Error adding product to cart', error });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, as: 'product' }],
    });
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Error fetching cart', error });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({ where: { userId: req.user.id, productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json({ message: 'Cart item updated successfully', cartItem });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ message: 'Error updating cart item', error });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cartItem = await Cart.findOne({ where: { userId: req.user.id, productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    return res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return res.status(500).json({ message: 'Error removing cart item', error });
  }
};
