module.exports = (sequelize, Sequelize) => {
  const Exam = sequelize.define("exam", {
    examId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "exam_id",
    },
    professorId: {
      type: Sequelize.INTEGER,
      field: "professor_id",
      allowNull: false,
    },
    class_name: {
      type: Sequelize.STRING,
      field: "class_name",
      allowNull: false,
    },
    degreeId: {
      type: Sequelize.INTEGER,
      field: "degree_id",
      allowNull: false,
    },
    semester: {
      type: Sequelize.INTEGER,
      field: "semester",
      allowNull: false,
    },
  });

  return Exam;
};
