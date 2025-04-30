'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    Color.hasMany(models.Product_variation, { 
      foreignKey: 'color_id_variations',
      as: 'product_variations'
    });

    Color.belongsToMany(models.Product, {
      through: models.Product_variation, 
      foreignKey: 'color_id_variations',
      otherKey: 'product_id_variations',
      as: 'products'
    });
    Color.belongsToMany(models.Cart_detail, {
      through: models.Product_variation,
      foreignKey: 'color_id_variations',
      otherKey: 'cart_detail_id',
      as: 'cart_detail'
    });
    }
  }
    Color.init({
    color_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    color_name: DataTypes.STRING,
    color_code: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Color',
    tableName: 'colors',
    timestamps: true,
    underscored: false
  });

  return Color;
};