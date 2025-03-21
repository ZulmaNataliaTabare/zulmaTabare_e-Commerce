'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_variation.belongsTo(models.product, { 
      foreignKey: 'product_id_variations',
      as: 'product'
    });
    product_variation.belongsTo(models.size, { 
      foreignKey: 'size_id_variations',
      as: 'size'
    });
    product_variation.belongsTo(models.color, { 
      foreignKey: 'color_id_variations',
      as: 'color'
    });
  }
  }
  product_variation.init({
    product_variation_id: DataTypes.INTEGER,
    product_id_variations: DataTypes.INTEGER,
    size_id_variations: DataTypes.INTEGER,
    color_id_variations: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_variation',
    timestamps: true,
    underscored: true
  });
    

  return product_variation;
};