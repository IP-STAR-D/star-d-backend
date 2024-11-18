const db = require("../models");
const Faculty = db.faculties;
const Op = db.Sequelize.Op;

// Create a new Faculty
exports.create = (req, res) => {
  const faculty_name = req.body.facultyName;

  if (!faculty_name) {
    return res.status(400).json({ message: "Faculty name cannot be empty" });
  }

  Faculty.create({ facultyName: faculty_name })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(500).json({
        message: err.message || "An error occurred while creating the faculty.",
      });
    });
};

// Retrieve all Faculties from the database
exports.findAll = (req, res) => {
  Faculty.findAll()
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

// Find a single Faculty with an id
exports.findOne = (req, res) => {
  const faculty_id = req.params.id;

  Faculty.findByPk(faculty_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Faculty with id=${faculty_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Faculty with id=" + faculty_id,
      });
    });
};

// Update a Faculty by the id in the request
exports.update = (req, res) => {
  const faculty_id = req.params.id;

  Faculty.update(req.body, {
    where: { facultyId: faculty_id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Faculty was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Faculty with id=${faculty_id}. Maybe Faculty was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Faculty with id=" + faculty_id,
      });
    });
};

// Delete a Faculty by the id in the request
exports.delete = (req, res) => {
  const faculty_id = req.params.id;

  Faculty.destroy({ where: { facultyId: faculty_id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Faculty was deleted successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot find Faculty with id=${faculty_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Faculty with id=" + faculty_id,
      });
    });
};
