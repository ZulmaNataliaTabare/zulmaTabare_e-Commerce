'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
    timestamps: true,
    underscored: true
  });

  Product.associate = function(models) {
    Product.belongsTo(models.category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    Product.hasMany(models.cart_detail, {
      foreignKey: 'product_id',
      as: 'cart_detail'
    });
    Product.hasMany(models.product_variation, {
      foreignKey: 'product_id_variations',
      as:'product_variation'
    });
  };

  return Product;
};