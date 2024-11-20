const db = require("../models");
const Appointment = db.appointments;
const Op = db.Sequelize.Op;

// Create a new Appointment
exports.create = (req, res) => {
  const { examId, groupId, classroomId, status, startTime, endTime } = req.body;

  if (!examId || !groupId || !classroomId || !startTime || !status || !endTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Appointment.create({ examId, groupId, classroomId, status, startTime, endTime })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(500).json({
        message: err.message || "An error occurred while creating the appointment.",
      });
    });
};

// Retrieve all Appointments from the database
exports.findAll = (req, res) => {
  Appointment.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointments.",
      });
    });
};
// Find all appointments by a groupId or examId
exports.findByGroupOrExamId = (req, res) => {
  const { examId, groupId } = req.params;
  let where = {};
  if (examId) {
    where = { examId };
  } else if (groupId) {
    where = { groupId }
  } else {
    return res.status(400).json({ message: "All fields are required" });
  }

  Appointment.findAll({where})
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No appointments found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving appointments!" + prof,
      });
    });
};

// Find a single Appointment with an id
exports.findOne = (req, res) => {
  const appointment_id = req.params.id;

  Appointment.findByPk(appointment_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Appointment with id=${appointment_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Appointment with id=" + appointment_id,
      });
    });
};


// Update a Appointment by the id in the request
exports.update = (req, res) => {
  const appointment_id = req.params.id;

  Appointment.update(req.body, {
    where: { appointmentId: appointment_id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Appointment was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Appointment with id=${appointment_id}. Maybe Appointment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Appointment with id=" + appointment_id,
      });
    });
};

// Delete a Appointment by the id in the request
exports.delete = (req, res) => {
  const appointment_id = req.params.id;

  Appointment.destroy({ where: { appointmentId: appointment_id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Appointment was deleted successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot find Appointment with id=${appointment_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Appointment with id=" + appointment_id,
      });
    });
};
