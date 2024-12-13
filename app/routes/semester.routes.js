module.exports = (app) => {
  const semesters = require("../controllers/semester.controller.js");

  const router = require("express").Router();

  // Create a new Semester
  router.post("/", semesters.create);

  // Retrieve all Semesters
  router.get("/", semesters.findAll);

  // Retrieve the Current Semester
  router.get("/current", semesters.findCurrentSemester);

  // Retrieve Semesters by Year and Semester
  router.get("/search", semesters.findByYearAndSemester);

  // Retrieve a single Semester by ID
  router.get("/:id", semesters.findOne);

  // Update a Semester by ID
  router.put("/:id", semesters.update);

  // Delete a Semester by ID
  router.delete("/:id", semesters.delete);

  app.use("/semesters", router);
};
