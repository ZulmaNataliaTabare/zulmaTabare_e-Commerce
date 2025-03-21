'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      size.hasMany(models.product_variations, { 
        foreignKey: 'size_id_variations',
        as: 'product_variations'
      });
    }
    }
  size.init({
    size_id: DataTypes.INTEGER,
    size_name: DataTypes.STRING,
    size_descrption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'size',
    timestamps: true,
    underscored: true
  });
  return size;
};