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
db.students = require("./student.model.js")(sequelize, Sequelize); // db for students
db.professors = require("./professor.model.js")(sequelize, Sequelize); // db for professors
db.appointments = require("./appointment.model.js")(sequelize, Sequelize); // db for appointments
db.semesters = require("./semester.model.js")(sequelize, Sequelize); // db for semesters

//relations
db.users.hasOne(db.professors, { foreignKey: "userId", sourceKey: "userId" });
db.users.belongsTo(db.professors, { foreignKey: "userId", sourceKey: "userId" });

db.users.hasOne(db.students, { foreignKey: "userId", sourceKey: "userId" });
db.users.belongsTo(db.students, { foreignKey: "userId", sourceKey: "userId" });

db.students.hasOne(db.users, { foreignKey: "userId", sourceKey: "userId" });
db.students.belongsTo(db.users, { foreignKey: "userId", sourceKey: "userId" });

db.professors.hasMany(db.exams, { foreignKey: "professor_id" });
db.exams.belongsTo(db.professors, { foreignKey: "professor_id" });

db.exams.hasMany(db.appointments, { foreignKey: "exam_id" });
db.appointments.belongsTo(db.exams, { foreignKey: "exam_id" });

db.groups.hasMany(db.students, { foreignKey: "groupId" });
db.students.belongsTo(db.groups, { foreignKey: "groupId" });

db.exams.belongsTo(db.users, { foreignKey: "professor_id" });
db.users.hasOne(db.exams, { foreignKey: "professor_id" });

db.degrees.hasMany(db.groups, { foreignKey: "degree_id" });
db.groups.belongsTo(db.degrees, { foreignKey: "degree_id" });

db.degrees.hasMany(db.exams, { foreignKey: "degree_id" });
db.exams.belongsTo(db.degrees, { foreignKey: "degree_id" });

db.degrees.belongsTo(db.faculties, { foreignKey: "facultyId" });

db.professors.belongsTo(db.users, { foreignKey: "userId" });
db.professors.belongsTo(db.faculties, { foreignKey: "facultyId" });

module.exports = db;
