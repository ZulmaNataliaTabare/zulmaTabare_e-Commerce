'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cart_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    timestamps: true,
    underscored: true
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'user'
    });
    Cart.hasMany(models.Cart_detail, { 
      foreignKey: 'cart_id',
      as: 'cart_detail'
    });
  }

  return Cart;
};