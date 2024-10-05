const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'), // You can set roles here
      defaultValue: 'user',
    },
  }, {
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.Cart, { foreignKey: 'userId' });
  };

  return User;
};
