'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    color.associate = function(models) {
    color.hasMany(models.product, { 
      foreignKey: 'color_id_variations',
      as: 'product'
    });
  };
    }
  }
    color.init({
    color_id: DataTypes.INTEGER,
    color_name: DataTypes.STRING,
    color_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'color',
    timestamps: false,
    underscored: true
  });

  return color;
};