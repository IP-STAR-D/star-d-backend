const db = require("../models");
const Classroom = db.classrooms;
const Op = db.Sequelize.Op;

// Create a new Classroom
exports.create = (req, res) => {
  const classroom_name = req.body.classroomName;

  if (!classroom_name) {
    return res.status(400).json({ message: "Classroom name cannot be empty" });
  }

  Classroom.create({ classroomName: classroom_name })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(500).json({
        message: err.message || "An error occurred while creating the classroom.",
      });
    });
};

// Retrieve all Faculties from the database
exports.findAll = (req, res) => {
  Classroom.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Faculties.",
      });
    });
};

// Find a single Classroom with an id
exports.findOne = (req, res) => {
  const classroom_id = req.params.id;

  Classroom.findByPk(classroom_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Classroom with id=${classroom_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Classroom with id=" + classroom_id,
      });
    });
};

// Find all Classrooms by capacity
exports.findByCapacity = (req, res) => {
  const capacity = req.params.capacity;

  Classroom.findAll({
    where: { capacity: capacity }
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Classroom with capacity=${capacity}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Classroom with capacity=" + capacity,
      });
    });
};

// Update a Classroom by the id in the request
exports.update = (req, res) => {
  const classroom_id = req.params.id;

  Classroom.update(req.body, {
    where: { classroomId: classroom_id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Classroom was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Classroom with id=${classroom_id}. Maybe Classroom was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Classroom with id=" + classroom_id,
      });
    });
};

// Delete a Classroom by the id in the request
exports.delete = (req, res) => {
  const classroom_id = req.params.id;

  Classroom.destroy({ where: { classroomId: classroom_id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Classroom was deleted successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot find Classroom with id=${classroom_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Classroom with id=" + classroom_id,
      });
    });
};
