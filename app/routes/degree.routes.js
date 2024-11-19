module.exports = (app) => {
  const degrees = require("../controllers/degree.controller.js");

  const router = require("express").Router();

  // Create a new degree
  router.post("/", degrees.create);

  // Retrieve all degrees
  router.get("/", degrees.findAll);

  // Retrieve a single degree with id
  router.get("/:id", degrees.findOne);

  // Retrieve all degrees by faculty_id
  router.get("/faculty/:faculty_id", degrees.findByFacultyId);

  // Update a degree with id
  router.put("/:id", degrees.update);

  // Delete a degree with id
  router.delete("/:id", degrees.delete);

  app.use("/degrees", router);
};
