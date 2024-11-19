module.exports = (app) => {
    const classrooms = require("../controllers/classroom.controller.js");
  
    const router = require("express").Router();
  
    // Create a new classroom
    router.post("/", classrooms.create);
  
    // Retrieve all classrooms
    router.get("/", classrooms.findAll);
  
    // Retrieve a single classroom with id
    router.get("/:id", classrooms.findOne);

    // Retrieve all classrooms by capacity
    router.get("/capacity/:capacity", classrooms.findByCapacity);
  
    // Update a classroom with id
    router.put("/:id", classrooms.update);
  
    // Delete a Faculty with id
    router.delete("/:id", classrooms.delete);
  
    app.use("/classrooms", router);
  };
  