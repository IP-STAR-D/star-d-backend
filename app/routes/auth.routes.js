module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    const router = require("express").Router();
  
    router.post("/", auth.loginUser);
  
    app.use('/auth', router);
  };
