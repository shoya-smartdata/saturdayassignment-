const sequelize = require('./config/db');

const User = require('./userModel')(sequelize);
const Product = require('./productSchema')(sequelize);
const Cart = require('./cartModel')(sequelize);
const Category = require('./categoryModel')(sequelize);
const Order = require('./orderModel')(sequelize);

// Associations
User.associate({ Order, Cart });
Product.associate({ Cart, Category, Order });
Category.associate({ Product });
Cart.associate({ User, Product });
Order.associate({ User, Product });

// Syncing the database
sequelize.sync({ force: true }) // Use with caution!
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = { User, Product, Cart, Category, Order };
