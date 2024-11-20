
const db = require("../models");
const   Professor = db.professors;
const Op = db.Sequelize.Op;


//Retrieve all Professors from the database.
exports.findAll = (req, res) => {
    Professor.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Professors.",
        });
      });
  };
  


  // Find a single Professor with an id
exports.findOne = (req, res) => {
    const user_id = req.params.id;
  
    Professor.findByPk(user_id)
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
          message: "Error retrieving Professor with user_id=" + user_id,
        });
      });
  };
  

  // Find all Professors by faculty_id
exports.findByFacultyId = (req, res) => {
    const faculty_id = req.params.faculty_id;
  
    Professor.findAll({
      where: { faculty_id: faculty_id },
    })
      .then((data) => {
        if (data && data.length > 0) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Professors with faculty_id=${faculty_id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Professors with faculty_id=" + faculty_id,
        });
      });
  };

