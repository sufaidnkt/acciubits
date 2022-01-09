module.exports = app => {
  const controller = require("../controllers/api.controller.js");
  var router = require("express").Router();

  // Retrieve all controller
  router.post("/newsletter", controller.newsLetter);
  router.post("/register", controller.register);

  app.use('/api', router);
};
