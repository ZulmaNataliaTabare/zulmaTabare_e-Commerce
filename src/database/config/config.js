require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    seederStoragePath: "../seeders",
    migrationStoragePath: "../migrations",
  },
  test: {
    username: "root", 
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    seederStoragePath: "../seeders",
    migrationStoragePath: "../migrations",
  },
  production: { 
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,         
    port: process.env.DB_PORT,         
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    seederStoragePath: "../seeders",
    migrationStoragePath: "../migrations",
  },
};