const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    products: {
      type: DataTypes.TEXT, // Store as stringified JSON
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered'),
      defaultValue: 'pending',
    },
  }, {
    timestamps: true,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Order;
};
