const express = require("express");
const router = express.Router();

//Import express validator
const { body } = require("express-validator");

//Import controller
const projectsController = require("../controllers/projectsController");

module.exports = function () {
  router.get("/", projectsController.projectsHome);
  router.get("/new-project", projectsController.projectForm);
  router.post(
    "/new-project",
    body("nombre").not().isEmpty().trim().escape(),
    projectsController.newProject
  );
  //List project
  router.get("/projects/:url", projectsController.projectByUrl);

  //Update project
  router.get("/projects/edit/:id", projectsController.editForm);
  router.post(
    "/new-project/:id",
    body("nombre").not().isEmpty().trim().escape(),
    projectsController.updateProject
  );

  //Delete project
  router.delete("/projects/:url", projectsController.deleteProject);

  return router;
};
