const Proyectos = require("../models/Proyectos");

exports.proyectosHome = async (req, res) => {
  const projects = await Proyectos.findAll();

  res.render("index", {
    pageName: "Proyectos",
    projects,
  });
};

exports.formularioProyecto = async (req, res) => {
  const projects = await Proyectos.findAll();

  res.render("nuevoProyecto", {
    pageName: "Nuevo Proyecto",
    projects,
  });
};

exports.nuevoProyecto = async (req, res) => {
  const projects = await Proyectos.findAll();

  //Validate forms
  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      pageName: "Nuevo Proyecto",
      errores,
      projects,
    });
  } else {
    const proyecto = await Proyectos.create({ nombre });
    res.redirect("/");
  }
};

exports.projectByUrl = async (req, res, next) => {
  const projects = await Proyectos.findAll();

  const project = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  if (!project) return next();

  res.render("tasks", {
    nombrePagina: "Project tasks",
    project,
    projects,
  });
};
