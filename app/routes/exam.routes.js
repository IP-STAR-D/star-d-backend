module.exports = app => {
    const exams = require("../controllers/exam.controller.js");
  
    const router = require("express").Router();
  
    // Retrieve all exams
    router.get("/", exams.findAll);
  
    // Retrieve a single exams with id
    router.get("/:id", exams.findOne);

    // Retrieve all the exams with a professor_id
    router.get("/professor/:professor_id", exams.findByProfessorId);

    // Retrieve all the exams with a degree_id
    router.get("/degree/:degree_id", exams.findByDegreeId);
  
    app.use('/exams', router);
  };
