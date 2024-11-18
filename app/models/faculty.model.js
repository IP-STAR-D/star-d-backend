module.exports = (sequelize, Sequelize) => {
  const Faculty = sequelize.define("faculty", {
    facultyId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "faculty_id",
    },
    facultyName: {
      type: Sequelize.STRING,
      field: "faculty_name",
      allowNull: false,
    },
  });

  return Faculty;
};
