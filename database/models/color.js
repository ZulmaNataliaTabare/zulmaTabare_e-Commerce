'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Color.associate = function(models) {
    Color.hasMany(models.Product, { 
      foreignKey: 'color_id_variations',
      as: 'product'
    });
  };
    }
  }
    Color.init({
    color_id: DataTypes.INTEGER,
    color_name: DataTypes.STRING,
    color_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
    timestamps: false,
    underscored: true
  });

  return Color;
};