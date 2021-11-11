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

exports.changeTaskStatus = async (req, res, next) => {
  const { id } = req.params;
  const task = await Tasks.findOne({ where: { id } });

  //Changing the status
  let status = 0;
  if (task.status === status) {
    status = 1;
  }
  task.status = status;

  const result = await task.save();
  if (!result) return next();

  res.status(200).send("Updated");
};
