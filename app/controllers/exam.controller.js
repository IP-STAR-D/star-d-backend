const db = require("../models");
const Exam = db.exams;
const User = db.users;
const Student = db.students;
const Group = db.groups;

// Retrieve all Exams from the database.
exports.findAll = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: Group,
          attributes: ["degreeId", "year"],
        },
      ],
    });

    const exams = await Exam.findAll({
      where: { degreeId: student.group.degreeId, year: student.group.year },
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    res.send(exams);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving exams.",
    });
  }
};

// Find a single Exam with an id
exports.findOne = (req, res) => {
  const exam_id = req.params.id;

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
exports.findByProfessorId = (req, res) => {
  const professor_id = req.params.professor_id;

  Exam.findAll({
    where: { professor_id: professor_id },
  })
    .then((data) => {
      if (data && data.length > 0) {
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
exports.findByDegreeId = (req, res) => {
  const degree_id = req.params.degree_id;

  Exam.findAll({
    where: { degree_id: degree_id },
  })
    .then((data) => {
      if (data && data.length > 0) {
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
