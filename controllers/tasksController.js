const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

exports.addTask = async (req, res, next) => {
  const project = await Projects.findOne({ where: { url: req.params.url } });
  const { tasks } = req.body;

  //Status 0 = incomplete
  const status = 0;
  const projectId = project.id;

  const result = await Tasks.create({ tasks, status, projectId });

  if (!result) {
    return next();
  }
  res.redirect(`/projects/${req.params.url}`);
};

exports.changeTaskStatus = async (req, res) => {
  res.send("fino");
};
