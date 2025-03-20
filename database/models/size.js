'use strict';
module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define ('Size', {
    size_id: DataTypes.INTEGER,
    size_name: DataTypes.STRING,
    size_descrption: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });

  Size.associate = function(models) {
    Size.hasMany(models.product_variations, { 
      foreignKey: 'size_id_variations',
      as: 'product_variations'
    });
  }

  return Size;
};