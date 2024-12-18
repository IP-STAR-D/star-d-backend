module.exports = (app) => {
  const faculties = require("../controllers/faculty.controller.js");
  const { authorize } = require("../middlewares/auth.js");

  const router = require("express").Router();

  // Create a new faculty
  router.post("/", faculties.create);

  // Retrieve all faculties
  router.get("/", faculties.findAll);

  // Retrieve a single faculty with id
  router.get("/:id", faculties.findOne);

  // Update a faculty with id
  router.put("/:id", faculties.update);

  // Delete a Faculty with id
  router.delete("/:id", faculties.delete);

  app.use("/faculties", authorize, router);
};
