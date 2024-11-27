require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const corsOptions = {
  origin: ["http://localhost:4200", "https://star-d-frontend.netlify.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");

db.sequelize
  .sync()
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
require("./app/routes/group.routes")(app); // routing for groups
require("./app/routes/faculty.routes")(app); // routing for faculties
require("./app/routes/classroom.routes")(app); // routing for classrooms
require("./app/routes/degree.routes")(app); // routing for degrees
require("./app/routes/student.routes")(app); // routing for students
require("./app/routes/appointment.routes")(app); // routing for appointment
require("./app/routes/auth.routes")(app); // routing for auth

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
