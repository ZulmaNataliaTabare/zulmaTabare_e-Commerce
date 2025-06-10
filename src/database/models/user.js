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
      User.belongsTo(models.Rol, {
        foreignKey: 'rol_id',
        as: 'rol'
      });
      User.hasMany(models.Cart, {
        foreignKey: 'user_id',
        as: 'carts'
      });
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', 
    timestamps: true,
    underscored: true 
  });

// // ------------------- BLOQUE DE PRUEBA  -------------------
//     const testGetLastUser = async () => {
//         try {
//             await sequelize.authenticate();
//             console.log('Conexión a la base de datos establecida correctamente.');

//             const latestUser = await User.findOne({
//                 order: [['createdAt', 'DESC']],
//             });

//             console.log('\n--- Resultado de User.findOne({ order: [[\'createdAt\', \'DESC\']] }) ---');
//             if (latestUser) {
//                 console.log('Último usuario encontrado:', latestUser.toJSON());
//             } else {
//                 console.log('No se encontraron usuarios.');
//             }
//             console.log('-------------------------------------------------------------------\n');

//             // Habilitar el registro de consultas SQL de Sequelize
//             sequelize.options.logging = (sql) => {
//                 console.log('\n--- Consulta SQL de Sequelize ---');
//                 console.log(sql);
//                 console.log('-----------------------------------\n');
//             };

//             const latestUserWithLogging = await User.findOne({
//                 order: [['createdAt', 'DESC']],
//             });

//             console.log('\n--- Resultado de User.findOne({ order: [[\'createdAt\', \'DESC\']] }) CON LOGGING ---');
//             if (latestUserWithLogging) {
//                 console.log('Último usuario encontrado (con logging):', latestUserWithLogging.toJSON());
//             } else {
//                 console.log('No se encontraron usuarios.');
//             }
//             console.log('---------------------------------------------------------------------------\n');

//         } catch (error) {
//             console.error('Error al conectar o consultar la base de datos:', error);
//         } finally {
//             // No es necesario cerrar la conexión aquí si tu aplicación principal la mantiene abierta
//             // await sequelize.close();
//         }
//     };

//     // Ejecutar la función de prueba si este archivo se ejecuta directamente
//     if (require.main === module) {
//         testGetLastUser();
//     }
//     // ------------------- FIN DEL BLOQUE DE PRUEBA -----------------------

    return User;
};