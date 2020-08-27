const { Sequelize } = require("sequelize");

module.exports = sequelize = new Sequelize("codegig", "root", "123456dm", {
  host: "localhost",
  dialect: "mysql",
});
