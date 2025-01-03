module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const { authorize } = require("../middlewares/auth.js");

  const router = require("express").Router();

  // Retrieve all users
  router.get("/", users.findAll);

  // Get user data
  router.get("/data", users.getUserData);

  // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Update a user with id
  router.put("/:id", users.update);

  app.use("/users", authorize, router);
};
