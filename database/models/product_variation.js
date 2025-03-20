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
      Product_variation.belongsTo(models.Product, { 
      foreignKey: 'product_id_variations',
      as: 'product'
    });
    Product_variation.belongsTo(models.Size, { 
      foreignKey: 'size_id_variations',
      as: 'size'
    });
    Product_variation.belongsTo(models.Color, { 
      foreignKey: 'color_id_variations',
      as: 'color'
    });
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
    timestamps: true,
    underscored: true
  });
    

  return Product_variation;
};