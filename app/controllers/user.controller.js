const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };

// Find a single User with an id
exports.findOne = (req, res) => {
  const user_id = req.params.user_id;

  User.findByPk(user_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with user_id=${user_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with user_id=" + user_id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const user_id = req.params.user_id;

  User.update(req.body, {
    where: { user_id }
  })
    .then(result => {
      if (result == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};
