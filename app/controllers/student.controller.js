const db = require("../models");
const Student = db.students;
const Group = db.groups;
const Op = db.Sequelize.Op;

//Retrieve all Students from the database.
exports.findAll = (req, res) => {
  Student.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Students.",
      });
    });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
  const user_id = req.params.id;

  Student.findByPk(user_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  with user_id=${user_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student with user_id=" + user_id,
      });
    });
};

// Find all Students by group_id
exports.findByGroupId = (req, res) => {
  const group_id = req.params.group_id;

  Student.findAll({
    where: { group_id: group_id },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Students with group_id=${group_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Students with group_id=" + group_id,
      });
    });
};

// Check if a Student is the Boss of their Group
exports.isBoss = async (req, res) => {
  try {
    const user_id = req.user.id;

    const student = await Student.findOne({
      where: { userId: user_id },
      include: [
        {
          model: Group,
          as: "group",
          attributes: ["bossId"],
        },
      ],
    });

    if (student) {
      const isBoss = student.group.bossId === user_id;
      res.send({ isBoss });
    } else {
      res.status(404).send({
        message: `Cannot find Student with user_id=${user_id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error checking boss status for Student with user_id=${user_id}.`,
    });
  }
};
