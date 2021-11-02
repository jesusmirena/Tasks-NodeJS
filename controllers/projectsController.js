const Projects = require("../models/Projects");

exports.projectsHome = async (req, res) => {
  const projects = await Projects.findAll();

  res.render("index", {
    pageName: "Projects",
    projects,
  });
};

exports.projectForm = async (req, res) => {
  const projects = await Projects.findAll();

  res.render("newProject", {
    pageName: "New Project",
    projects,
  });
};

exports.newProject = async (req, res) => {
  const projects = await Projects.findAll();

  //Validate forms
  const { name } = req.body;
  let errors = [];

  if (!name) {
    errors.push({ texto: "Add a project name" });
  }

  if (errors.length > 0) {
    res.render("newProject", {
      pageName: "New Project",
      errors,
      projects,
    });
  } else {
    const project = await Projects.create({ name });
    res.redirect("/");
  }
};

exports.projectByUrl = async (req, res, next) => {
  const projects = await Projects.findAll();

  const project = await Projects.findOne({
    where: {
      url: req.params.url,
    },
  });

  if (!project) return next();

  res.render("tasks", {
    pageName: "Project tasks",
    project,
    projects,
  });
};
