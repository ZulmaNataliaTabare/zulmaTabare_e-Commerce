'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.user, { 
      foreignKey: 'user_id', 
      as: 'user'
    });
    cart.hasMany(models.cart_detail, { 
      foreignKey: 'cart_id',
      as: 'cart_detail'
    });
  }
}
cart.init({
    cart_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'cart',
    timestamps: true,
    underscored: true
  });
  return cart;
};