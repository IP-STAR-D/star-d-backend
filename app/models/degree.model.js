module.exports = (sequelize, Sequelize) => {
  const Degree = sequelize.define("degree", {
    degreeId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "degree_id",
    },
    degreeName: {
      type: Sequelize.STRING,
      field: "degree_name",
      allowNull: false,
    },
    facultyId: {
      type: Sequelize.INTEGER,
      field: "faculty_id",
      allowNull: false,
      references: {
        model: "faculty",
        key: "facultyId",
      },
    },
  });

  return Degree;
};
