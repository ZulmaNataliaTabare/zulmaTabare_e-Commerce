'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'user'
    });
    Cart.hasMany(models.Cart_detail, { 
      foreignKey: 'cart_id',
      as: 'cart_detail'
    });
  }
}
Cart.init({
    cart_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: true,
    underscored: true
  });
  return Cart;
};