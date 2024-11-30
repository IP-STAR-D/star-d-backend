module.exports = (app) => {
  const appointments = require("../controllers/appointment.controller.js");
  const { authorize } = require("../middlewares/auth.js");

  const router = require("express").Router();

  // Retrieve all appointments
  router.get("/", appointments.findAll);

  // Retrieve appointments by professorId, classroomId, day
  router.get("/filter", authorize, appointments.findFiltered);

  // Retrieve a single appointment with id
  router.get("/:id", appointments.findOne);

  // Create appointment
  router.post("/", appointments.create);

  // Update appointment
  router.put("/:id", appointments.update);

  // Retrieve all the appointments with a ExamId
  router.get("/Exam/:examId", appointments.findByGroupOrExamId);

  // Retrieve all the appointments with a groupId
  router.get("/group/:groupId", appointments.findByGroupOrExamId);

  app.use("/appointments", authorize, router);
};
