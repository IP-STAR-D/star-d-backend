module.exports = app => {
    const appointments = require("../controllers/appointment.controller.js");
  
    const router = require("express").Router();
  
    // Retrieve all appointments
    router.get("/", appointments.findAll);
  
    // Retrieve a single appointments with id
    router.get("/:id", appointments.findOne);

    // Retrieve all the appointments with a ExamId
    router.get("/Exam/:ExamId", appointments.findByGroupOrExamId);

    // Retrieve all the appointments with a groupId
    router.get("/group/:groupId", appointments.findByGroupOrExamId);
  
    app.use('/appointments', router);
  };
