'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      product.hasMany(models.cart_detail, {
        foreignKey: 'product_id',
        as: 'cart_detail'
      });
      product.hasMany(models.product_variation, {
        foreignKey: 'product_id_variations',
        as:'product_variation'
      });
    };
  }
  product.init({
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    product_description: DataTypes.STRING,
    features: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'product',
    timestamps: true,
    underscored: true
  });

  return product;
};