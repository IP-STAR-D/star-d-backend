const db = require("../models");
const Exam = db.exams;
const Op = db.Sequelize.Op;

// Retrieve all Exams from the database.
exports.findAll = (req, res) => {
  Exam.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exams.",
      });
    });
};

// Find a single Exam with an id
exports.findOne = (req, res) => {
  const exam_id = req.params.exam_id;

  Exam.findByPk(exam_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  with exam_id=${exam_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Exam with exam_id=" + exam_id,
      });
    });
};

// Find a single Exam with a professor_id
exports.findOne = (req, res) => {
  const professor_id = req.params.professor_id;

  Exam.findByPk(professor_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  with professor_id=${professor_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Exam with professor_id=" + professor_id,
      });
    });
};

// Find a single Exam with a degree_id
exports.findOne = (req, res) => {
  const degree_id = req.params.degree_id;

  Exam.findByPk(degree_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  with degree_id=${degree_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Exam with degree_id=" + degree_id,
      });
    });
};
