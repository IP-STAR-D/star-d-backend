module.exports = (app) => {
  const students = require("../controllers/student.controller.js");
  const { authorize } = require("../middlewares/auth.js");

  const router = require("express").Router();

  // Retrieve all students
  router.get("/", students.findAll);

  // Check if a student is the boss of their group
  router.get("/is_boss", students.isBoss);

  // Retrieve a single student with id
  router.get("/:id", students.findOne);

  // Retrieve all the student with a group_id
  router.get("/group/:group_id", students.findByGroupId);

  app.use("/students", authorize, router);
};
