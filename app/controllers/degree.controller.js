const db = require("../models");
const Degree = db.degrees;
const Op = db.Sequelize.Op;

// Create a new Degree
exports.create = (req, res) => {
  const degree_name = req.body.degreeName;
  const faculty_id = req.body.facultyId;

  if (!degree_name || !faculty_id) {
    return res
      .status(400)
      .json({ message: "Degree name and faculty ID cannot be empty." });
  }

  Degree.create({ degreeName: degree_name, facultyId: faculty_id })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(500).json({
        message: err.message || "An error occurred while creating the degree.",
      });
    });
};

// Retrieve all Degrees from the database
exports.findAll = (req, res) => {
  Degree.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Degrees.",
      });
    });
};

// Find a single Degree with an id
exports.findOne = (req, res) => {
  const degree_id = req.params.id;

  Degree.findByPk(degree_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Degree with id=${degree_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Degree with id=" + degree_id,
      });
    });
};

// Find all Degrees by faculty_id
exports.findByFacultyId = (req, res) => {
  const faculty_id = req.params.faculty_id;

  Degree.findAll({
    where: { faculty_id: faculty_id },
  })
    .then((data) => {
      if (data && data.lenght > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Degree with faculty_id=${faculty_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Degree with faculty_id=" + faculty_id,
      });
    });
};

// Update a Degree by the id in the request
exports.update = (req, res) => {
  const degree_id = req.params.id;

  Degree.update(req.body, {
    where: { degreeId: degree_id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Degree was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Degree with id=${degree_id}. Maybe Degree was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Degree with id=" + degree_id,
      });
    });
};

// Delete a Degree by the id in the request
exports.delete = (req, res) => {
  const degree_id = req.params.id;

  Degree.destroy({ where: { degreeId: degree_id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Degree was deleted successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot find Degree with id=${degree_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Degree with id=" + degree_id,
      });
    });
};
