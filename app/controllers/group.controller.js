const db = require("../models");
const Group = db.groups;
const Exam = db.exams;
const Degree = db.degrees;
const Op = db.Sequelize.Op;

// Retrieve all Groups from the database.
exports.findAll = (req, res) => {
  Group.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Groups.",
      });
    });
};

// Find a single Group with an id
exports.findOne = (req, res) => {
  const group_id = req.params.id;

  Group.findByPk(group_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  with group_id=${group_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Group with group_id=" + group_id,
      });
    });
};

// Find a single Group with a degree_id
exports.findByDegree = (req, res) => {
  const degree_id = req.params.degree_id;

  Group.findAll({
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
        message: "Error retrieving Group with degree_id=" + degree_id,
      });
    });
};

exports.findByBossId = (req, res) => {
  const boss_id = req.params.boss_id;

  Group.findAll({
    where: { boss_id: boss_id },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  with boss_id=${boss_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Group with boss_id=" + boss_id,
      });
    });
};

// Find groups by professor_id
exports.findByProfessorId = (req, res) => {
  const professorId = req.params.professor_id;

  Group.findAll({
    attributes: ["groupId", "groupName", "degreeId", "bossId", "year"],
    include: [
      {
        model: Degree,
        as: "degree",
        attributes: [],
        required: false,
        include: [
          {
            model: Exam,
            as: "exams",
            attributes: [],
            where: { professorId },
            required: false,
          },
        ],
      },
    ],
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find groups with professor_id=${professor_id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving groups with professor_id=" + professor_id,
      });
    });
};

// Find a single Group by a year
exports.findByYear = (req, res) => {
  const year = req.params.year;

  Group.findAll({
    where: { year: year },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  with year=${year}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Group with year=" + year,
      });
    });
};
