module.exports = (app) => {
  const exams = require("../controllers/exam.controller.js");
  const { authorize } = require("../middlewares/auth.js");

  const router = require("express").Router();

  // Retrieve all exams
  router.get("/all", exams.findAll);

  // Retrieve all exams pertinent to the student
  router.get("/", authorize, exams.findAllPertinent);

  // Retrieve a single exams with id
  router.get("/:id", exams.findOne);

  // Retrieve all the exams with a professor_id
  router.get("/professor/:professor_id", exams.findByProfessorId);

  // Retrieve all the exams with a degree_id
  router.get("/degree/:degree_id", exams.findByDegreeId);

  app.use("/exams", authorize, router);
};
