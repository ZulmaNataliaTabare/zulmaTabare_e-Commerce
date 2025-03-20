'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    timestamps: true,
    underscored: true
  });

  User.associate = function(models) {
    User.hasMany(models.cart, { 
      foreignKey: 'user_id',
      as: 'cart'
    });
    User.belongsTo(models.rol, { 
      foreignKey: 'rol_id', 
      as: 'rol'
    });
  };
  return User;
};