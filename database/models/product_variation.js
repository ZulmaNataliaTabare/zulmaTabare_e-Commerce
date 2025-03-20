'use strict';

module.exports = (sequelize, DataTypes) => { 
  const Product_variation = sequelize.define ('Product_variation', {
    product_variation_id: DataTypes.INTEGER,
    product_id_variations: DataTypes.INTEGER,
    size_id_variations: DataTypes.INTEGER,
    color_id_variations: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true
  });

  Product_variation.associate = function(models) {
    Product_variation.belongsTo(models.Product, { 
      foreignKey: 'product_id_variations',
      as: 'product'
    });
    Product_variation.belongsTo(models.Size, { 
      foreignKey: 'size_id_variations',
      as: 'size'
    });
    Product_variation.belongsTo(models.Color, { 
      foreignKey: 'color_id_variations',
      as: 'color'
    });
  }

  return Product_variation;
};