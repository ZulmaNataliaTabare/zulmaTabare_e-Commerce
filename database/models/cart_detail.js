'use strict';
module.exports = (sequelize, DataTypes) => {
const Cart_detail = sequelize.define('Cart_detail', {
    cart_item_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    product_id: DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true
  });
    
  Cart_detail.associate = function(models) {
    Cart_detail.belongsTo(models.Cart, { 
      foreignKey: 'cart_id',
      as: 'cart'
    });
    Cart_detail.belongsTo(models.Product, { 
      foreignKey: 'product_id',
      as: 'product'
    });
  }
  
  return Cart_detail;
};