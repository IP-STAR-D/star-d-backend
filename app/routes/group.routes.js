module.exports = app => {
    const groups = require("../controllers/group.controller.js");
  
    const router = require("express").Router();
  
    // Retrieve all groups
    router.get("/", groups.findAll);
  
    // Retrieve a single groups with id
    router.get("/:id", groups.findOne);

    // Retrieve all the groups with a degree_id
    router.get("/:degree_id", groups.findAll);

    // Retrieve all the groups by a year
    router.get("/:year", groups.findAll);

    app.use('/groups', router);
  };
