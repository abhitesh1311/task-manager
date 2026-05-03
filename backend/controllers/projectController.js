import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const { name, description, members } = req.body;
  if (!name) return res.status(400).json({ message: "Project name required" });
  const project = await Project.create({ name, description, members: members || [], createdBy: req.user._id });
  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { members: req.user._id };
  const projects = await Project.find(query).populate("members", "name email role").populate("createdBy", "name email");
  res.json(projects);
};
