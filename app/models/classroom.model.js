module.exports = (sequelize, Sequelize) => {
    const Classroom = sequelize.define("classroom", {
      classroomId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "classroom_id",
      },
      capacity: {
        type: Sequelize.INTEGER,
        field: "capacity",
        allowNull: false,
      },
    });
  
    return Classroom;
  };
  