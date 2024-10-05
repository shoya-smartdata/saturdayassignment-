const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'categoryId' });
  };

  return Category;
};
