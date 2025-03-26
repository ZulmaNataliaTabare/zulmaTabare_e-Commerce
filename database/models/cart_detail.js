'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    cart_detail.belongsTo(models.cart, { 
      foreignKey: 'cart_id',
      as: 'cart'
    });
    cart_detail.belongsTo(models.Product, { 
      foreignKey: 'product_id',
      as: 'product'
    });
  }
  }



cart_detail.init ({
    cart_item_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart_detail',
    timestamps: true,
    underscored: true
  });

    
  
  
  return cart_detail;
};