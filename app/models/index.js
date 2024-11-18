const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  schema: 'exam_appointments',
  define: {
    timestamps: false,
  },
  pool: dbConfig.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize); // db for users
db.exams = require("./exam.model.js")(sequelize, Sequelize); // db for exams
db.faculties = require("./faculty.model.js")(sequelize, Sequelize); // db for faculties

module.exports = db;
