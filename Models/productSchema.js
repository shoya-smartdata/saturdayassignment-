const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  }, {
    timestamps: true,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Product.hasMany(models.Cart, { foreignKey: 'productId' });
  };

  return Product;
};
