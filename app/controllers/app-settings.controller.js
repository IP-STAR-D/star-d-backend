const db = require("../models");
const AppSettings = db.appSettings;

const settingsList = ['sendEmails'];

// Retrieve all App Settings from the database.
exports.findAll = (req, res) => {
  AppSettings.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving App Settings.",
      });
    });
};

// Update a Setting by the name in the request
exports.update = (req, res) => {
  const setting = req.params.setting;
  if (!settingsList.includes(setting)) {
    res.status(404).send({
      message: "The given setting does not exist: " + setting,
    });
  }
  AppSettings.update(req.body, {
    where: { name: setting },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Setting was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Setting with name=${setting}. Maybe Setting was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Setting with name=" + setting,
      });
    });
};
