const express = require("express");
const router = express.Router();

//Import express validator
const { body } = require("express-validator");

//Import controller
const proyectosController = require("../controllers/proyectosController");

module.exports = function () {
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );
  router.get("/projects/:url", proyectosController.projectByUrl);
  return router;
};
