'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    }, 
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    user_password: DataTypes.STRING,
    security_question: DataTypes.STRING,
    security_answer: DataTypes.STRING,
    rol_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    underscored: false,
    hooks: {
    beforeCreate: async (user) => {
      user.user_password = await bcrypt.hash(user.user_password, saltRounds);
    }
    }
    });

  User.associate = function(models) {
    User.hasMany(models.Cart, { 
      foreignKey: 'user_id',
      as: 'cart'
    });
    User.belongsTo(models.Rol, { 
      foreignKey: 'rol_id', 
      as: 'rol'
    });
  };
  return User;
};