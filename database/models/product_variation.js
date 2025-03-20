'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_variation.init({
    product_variation_id: DataTypes.INTEGER,
    product_id_variations: DataTypes.INTEGER,
    size_id_variations: DataTypes.INTEGER,
    color_id_variations: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_variation',
  });
  return Product_variation;
};