'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Size.hasMany(models.Product_variation, { 
        foreignKey: 'size_id_variations',
        as: 'product_variations'
      });
    }
    }
  Size.init({
    size_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
    size_name: DataTypes.STRING,
    size_descrption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Size',
    timestamps: true,
    underscored: false
  });
  return Size;
};