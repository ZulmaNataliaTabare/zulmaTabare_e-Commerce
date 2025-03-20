'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Color = sequelize.define('Color', {
    color_id: DataTypes.INTEGER,
    color_name: DataTypes.STRING,
    color_code: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true
  });

  Color.associate = function(models) {
    Color.hasMany(models.Product, { 
      foreignKey: 'color_id_variations',
      as: 'product'
    });
  }

  return Color;
};