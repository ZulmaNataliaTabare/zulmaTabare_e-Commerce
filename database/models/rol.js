'use strict';
  
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rol.hasMany(models.user, { 
        foreignKey: 'rol_id',
        as: 'users'
      });
    }
    }

  rol.init({
    rol_id: DataTypes.INTEGER,
    rol_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rol',
    timestamps: false,
    underscored: true
  });

  return rol;
};