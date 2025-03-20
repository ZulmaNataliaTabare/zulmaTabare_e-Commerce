'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(Category, {
    category_id: DataTypes.INTEGER,
    category_name: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });

  Category.associate = function(models) {
    Category.hasMany(models.Product, { 
      foreignKey: 'category_id',
      as: 'product'
    });
  }
  return Category;
};