module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    appointmentId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "appointment_id",
    },
    examId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      field: "exam_id",
      allowNull: false,
      references: {
        model: "exam",
        key: "examId",
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      field: "group_id",
      allowNull: false,
      references: {
        model: "group",
        key: "groupId",
      },
    },
    classroomId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      field: "classroom_id",
      allowNull: false,
      references: {
        model: "classroom",
        key: "classroomId",
      },
    },
    status: {
      type: Sequelize.STRING,
      field: "status",
      allowNull: false,
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "start_time"
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "end_time"
    }
  });

  return Appointment;
};
