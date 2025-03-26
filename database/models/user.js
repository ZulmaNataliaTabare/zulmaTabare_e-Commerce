'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    user_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    user_password: DataTypes.STRING,
    security_question: DataTypes.STRING,
    security_answer: DataTypes.STRING,
    rol_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true,
    underscored: true,
    hooks: {
    beforeCreate: async (user) => {
      user.user_password = await bcrypt.hash(user.user_password, saltRounds);
    }
    }
    });

  user.associate = function(models) {
    user.hasMany(models.cart, { 
      foreignKey: 'user_id',
      as: 'cart'
    });
    user.belongsTo(models.rol, { 
      foreignKey: 'rol_id', 
      as: 'rol'
    });
  };
  return user;
};