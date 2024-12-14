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
      foreignKey: true,
      field: "professor_id",
      allowNull: false,
      references: {
        model: "professors",
        key: "user_id",
      },
    },
    class_name: {
      type: Sequelize.STRING,
      field: "class_name",
      allowNull: false,
    },
    degreeId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      field: "degree_id",
      allowNull: false,
      references: {
        model: "degrees",
        key: "degree_id",
      },
    },
    semester: {
      type: Sequelize.INTEGER,
      field: "semester",
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      field: "year",
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      field: "type",
      allowNull: false,
      validate: {
        isIn: {
          args: [["exam", "colloquy"]],
          msg: "Type must be exam or colloquy",
        },
      },
    },
  });

  return Exam;
};
