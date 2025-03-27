'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      Product.hasMany(models.Cart_detail, {
        foreignKey: 'product_id',
        as: 'cart_detail'
      });
      Product.hasMany(models.Product_variation, {
        foreignKey: 'product_id_variations',
        as:'product_variation'
      });
    };
  }
  Product.init({
    product_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
    product_name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    product_description: DataTypes.STRING,
    features: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true,
    underscored: false
  });

  return Product;
};