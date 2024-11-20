module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    const router = require("express").Router();
  
    // Retrieve all students
    router.get("/", students.findAll);
  
    // Retrieve a single student with id
    router.get("/:id", students.findOne);

    // Retrieve all the student with a group_id
    router.get("/group/:group_id", students.findByGroupId);

    app.use('/students', router);
  };




