const express = require("express");
const router = express.Router();

//Import express validator
const { body } = require("express-validator");

//Import controller
const projectsController = require("../controllers/projectsController");
const tasksController = require("../controllers/tasksController");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

module.exports = function () {
  router.get(
    "/",
    authController.userAuthenticated,
    projectsController.projectsHome
  );
  router.get(
    "/new-project",
    authController.userAuthenticated,
    projectsController.projectForm
  );
  router.post(
    "/new-project",
    authController.userAuthenticated,
    body("nombre").not().isEmpty().trim().escape(),
    projectsController.newProject
  );
  //List project
  router.get(
    "/projects/:url",
    authController.userAuthenticated,
    projectsController.projectByUrl
  );

  //Update project
  router.get(
    "/projects/edit/:id",
    authController.userAuthenticated,
    projectsController.editForm
  );
  router.post(
    "/new-project/:id",
    authController.userAuthenticated,
    body("nombre").not().isEmpty().trim().escape(),
    projectsController.updateProject
  );

  //Delete project
  router.delete(
    "/projects/:url/:id",
    authController.userAuthenticated,
    projectsController.deleteProject
  );

  //TASKS
  router.post(
    "/projects/:url",
    authController.userAuthenticated,
    tasksController.addTask
  );

  //Update task
  router.patch(
    "/tasks/:id",
    authController.userAuthenticated,
    tasksController.changeTaskStatus
  );

  //Delete task
  router.delete(
    "/tasks/:id",
    authController.userAuthenticated,
    tasksController.deleteTask
  );

  //USERS

  //Create account
  router.get("/create-account", usersController.createAccountForm);
  router.post("/create-account", usersController.createAccount);

  //Login
  router.get("/login", usersController.loginForm);
  router.post("/login", authController.authenticateUser);

  //Logout
  router.get("/logout", authController.logout);

  //Reset Password
  router.get("/reset-password", usersController.resetPasswordForm);

  return router;
};
