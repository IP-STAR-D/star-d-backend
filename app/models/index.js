const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  schema: "exam_appointments",
  define: {
    timestamps: false,
  },
  pool: dbConfig.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize); // db for users
db.exams = require("./exam.model.js")(sequelize, Sequelize); // db for exams
db.faculties = require("./faculty.model.js")(sequelize, Sequelize); // db for faculties
db.degrees = require("./degree.model.js")(sequelize, Sequelize); // db for degrees

db.groups = require("./group.model.js")(sequelize, Sequelize); // db for groups
db.classrooms = require("./classroom.model.js")(sequelize, Sequelize); // db for classrooms
db.students=require("./student.model.js")(sequelize, Sequelize); // db for students
db.professors=require("./professor.model.js")(sequelize, Sequelize); // db for professors
db.appointments=require("./appointment.model.js")(sequelize, Sequelize); // db for appointments

db.users.hasOne(db.professors,{foreignKey: 'userId', sourceKey: 'userId'})
db.users.belongsTo(db.professors,{foreignKey: 'userId', sourceKey: 'userId'});
db.users.hasOne(db.students,{foreignKey: 'userId', sourceKey: 'userId'})
db.users.belongsTo(db.students,{foreignKey: 'userId', sourceKey: 'userId'});

db.students.hasOne(db.users,{foreignKey: 'userId', sourceKey: 'userId'})
db.students.belongsTo(db.users,{foreignKey: 'userId', sourceKey: 'userId'});

module.exports = db;
