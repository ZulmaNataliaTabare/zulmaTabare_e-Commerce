'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    rol_id: DataTypes.INTEGER,
    rol_name: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true
  });

  Rol.associate = function(models) {
    Rol.hasMany(models.User, { 
      foreignKey: 'rol_id',
      as: 'users'
    });
  }

  return Rol;
};