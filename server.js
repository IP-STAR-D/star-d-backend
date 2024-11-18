require('dotenv').config()

const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Star-D backend." });
});

require("./app/routes/user.routes")(app); // routing for users
require("./app/routes/exam.routes")(app); // routing for exams
require("./app/routes/faculty.routes")(app); // routing for faculties

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
