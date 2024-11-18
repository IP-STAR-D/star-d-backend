const db = require("../models");
const Group = db.groups;
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
  const group_id = req.params.group_id;

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
exports.findOne = (req, res) => {
  const degree_id = req.params.degree_id;

  Group.findByFk(degree_id)
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
        message: "Error retrieving Group with degree_id=" + degree_id,
      });
    });
};

// Find a single Group by a year
exports.findOne = (req, res) => {
    const year = req.params.year;
  
    Group.findBy(year)
      .then((data) => {
        if (data) {
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
