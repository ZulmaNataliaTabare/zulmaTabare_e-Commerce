'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    Cart_detail.belongsTo(models.Cart, { 
      foreignKey: 'cart_id',
      as: 'cart'
    });
    Cart_detail.belongsTo(models.Product, { 
      foreignKey: 'product_id',
      as: 'product'
    });
  }
  }



Cart_detail.init ({
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
    cart_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_detail',
    timestamps: true,
    underscored: false
  });

    
  
  
  return Cart_detail;
};