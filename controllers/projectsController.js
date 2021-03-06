const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

exports.projectsHome = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = await Projects.findAll({ where: { userId } });

  res.render("index", {
    pageName: "Projects",
    projects,
  });
};

exports.projectForm = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = await Projects.findAll({ where: { userId } });

  res.render("newProject", {
    pageName: "New Project",
    projects,
  });
};

exports.newProject = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = await Projects.findAll({ where: { userId } });

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
    //No errors, insert in DB
    const userId = res.locals.user.id;
    await Projects.create({ name, userId });
    res.redirect("/");
  }
};

exports.projectByUrl = async (req, res, next) => {
  const userId = res.locals.user.id;
  const projectsPromise = Projects.findAll({ where: { userId } });

  const projectPromise = Projects.findOne({
    where: {
      url: req.params.url,
      userId,
    },
  });

  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise,
  ]);

  //check tasks of each project
  const tasks = await Tasks.findAll({
    where: {
      projectId: project.id,
    },
  });

  if (!project) return next();

  res.render("tasks", {
    pageName: "Project tasks",
    project,
    projects,
    tasks,
  });
};

exports.editForm = async (req, res) => {
  const userId = res.locals.user.id;
  const projectsPromise = Projects.findAll({ where: { userId } });
  const projectPromise = Projects.findOne({
    where: {
      id: req.params.id,
      userId,
    },
  });
  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise,
  ]);
  res.render("newProject", {
    pageName: "Edit Project",
    projects,
    project,
  });
};

exports.updateProject = async (req, res) => {
  const userId = res.locals.user.id;
  const projects = Projects.findAll({ where: { userId } });

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
    await Projects.update({ name: name }, { where: { id: req.params.id } });
    res.redirect("/");
  }
};
exports.deleteProject = async (req, res, next) => {
  // const { projectUrl, projectId } = req.query;

  await Tasks.destroy({ where: { projectId: req.params.id } });

  const result = await Projects.destroy({ where: { url: req.params.url } });
  if (!result) {
    return next();
  }
  res.status(200).send("Your project has been deleted successfully");
};
