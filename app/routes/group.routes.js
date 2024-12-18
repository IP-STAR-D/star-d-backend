module.exports = app => {
    const groups = require("../controllers/group.controller.js");
    const { authorize } = require("../middlewares/auth.js");
  
    const router = require("express").Router();
  
    // Retrieve all groups
    router.get("/", groups.findAll);
  
    // Retrieve a single groups with id
    router.get("/:id", groups.findOne);

    // Retrieve all the groups with a degree_id
    router.get("/degree/:degree_id", groups.findByDegree);

    // Retrieve a single group by bossId
    router.get("/bossId/:boss_id", groups.findByBossId);

    // Retrieve all the groups by a year
    router.get("/year/:year", groups.findByYear);

    app.use('/groups', authorize, router);
  };
