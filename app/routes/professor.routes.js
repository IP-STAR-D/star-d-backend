module.exports = app => {
    const professors = require("../controllers/professor.controller.js");
  
    const router = require("express").Router();
  
    // Retrieve all professors
    router.get("/", professors.findAll);
  
    // Retrieve a single professor with id
    router.get("/:id", professors.findOne);

    // Retrieve all the professors with a faculty_id
    router.get("/faculty/:faculty_id", professors.findByFacultyId);

    app.use('/professors', router);
  };




