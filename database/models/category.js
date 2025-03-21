'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category.hasMany(models.product, { 
      foreignKey: 'category_id',
      as: 'product'
    });
  }

  }
  category.init({
    category_id: DataTypes.INTEGER,
    category_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
    timestamps: true,
    underscored: true
  });

  return category;
};