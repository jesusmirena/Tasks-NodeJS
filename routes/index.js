const express = require("express");
const router = express.Router();

//Import express validator
const { body } = require("express-validator");

//Import controller
const projectsController = require("../controllers/projectsController");
const tasksController = require("../controllers/tasksController");
const usersController = require("../controllers/usersController");

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
  router.delete("/projects/:url/:id", projectsController.deleteProject);

  //TASKS
  router.post("/projects/:url", tasksController.addTask);

  //Update task
  router.patch("/tasks/:id", tasksController.changeTaskStatus);

  //Delete task
  router.delete("/tasks/:id", tasksController.deleteTask);

  //USERS
  router.get("/create-account", usersController.createAccountForm);
  return router;
};
