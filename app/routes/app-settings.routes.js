module.exports = (app) => {
  const AppSettings = require("../controllers/app-settings.controller.js");
  const { authorize, checkAdmin } = require("../middlewares/auth.js");

  const router = require("express").Router();

  // Retrieve all settings
  router.get("/", AppSettings.findAll);

  // Update sendEmails field
  router.put("/:setting", AppSettings.update);

  app.use("/app-settings", [authorize, checkAdmin], router);
};
