'use strict';
  
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasMany(models.User, { 
        foreignKey: 'rol_id',
        as: 'users'
      });
    }
    }

  Rol.init({
    rol_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
    rol_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    timestamps: false,
    underscored: true
  });

  return Rol;
};