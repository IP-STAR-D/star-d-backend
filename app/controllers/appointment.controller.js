const db = require("../models");
const Appointment = db.appointments;
const Student = db.students;
const Professor = db.professors;
const Exam = db.exams;
const Group = db.groups;
const Op = db.Sequelize.Op;

const checkIfBoss = async (studentId) => {
  let student = await Student.findByPk(studentId, {
    include: [
      {
        model: Group,
        attributes: ["bossId"],
      },
    ],
  });
  return studentId === student.group.bossId;
}

// Create a new Appointment
exports.create = async (req, res) => {
  const { examId, groupId, classroomId, status, startTime, endTime } = req.body;
  const studentIsBoss = await checkIfBoss(req.user.id);
  if (req.user.role == "student" && !studentIsBoss) {
    return res.status(400).json({ message: "Student is not the leader of the group!" });
  }

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
exports.findAll = async (req, res) => {
  let conditions = {};
  if (req.user.role == "student") {
    let student = await Student.findByPk(req.user.id);

    conditions = { where: { groupId: student.groupId } };
  } else {
    conditions = {
      attributes: ["*"],
      include: [
        {
          model: Exam,
          attributes: ["class_name"],
          required: true,
          include: [
            {
              model: Professor,
              attributes: [],
              required: true,
              where: { user_id: req.user.id },
            },
          ],
        },
      ],
      raw: true,
    };
  }
  Appointment.findAll(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Appointments.",
      });
    });
};

// Find appointments by professorId, classroomId, day
exports.findFiltered = (req, res) => {
  const { professorId, classroomId, day } = req.query;

  if (!professorId && !classroomId && !day) {
    return res.status(400).json({ message: "At least one filter is required." });
  }

  let conditions = { where: {} };

  if (classroomId) {
    conditions.where.classroomId = classroomId;
  }

  if (professorId) {
    conditions.include = [
      {
        model: Exam,
        required: true,
        where: { professorId: professorId },
      },
    ];
  }

  if (day) {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    conditions.where.startTime = {
      [Op.between]: [startOfDay, endOfDay],
    };
  }

  Appointment.findAll(conditions)
    .then((data) => {
      console.log(data);
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({ message: "No appointments found for the provided criteria." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving appointments.",
        error: err.message,
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
    where = { groupId };
  } else {
    return res.status(400).json({ message: "All fields are required" });
  }

  Appointment.findAll({ where })
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
