module.exports = (sequelize, Sequelize) => {
  const Semester = sequelize.define("semester", {
    semesterId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "semester_id",
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    semester: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    colloquyStart: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "colloquy_start",
    },
    colloquyEnd: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "colloquy_end",
    },
    examStart: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "exam_start",
    },
    examEnd: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "exam_end",
    },
    semesterStart: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "semester_start",
    },
    semesterEnd: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "semester_end",
    },
  });

  return Semester;
};
