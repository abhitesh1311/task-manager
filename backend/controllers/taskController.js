import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, project, assignedTo, dueDate } = req.body;
  if (!title || !project || !assignedTo || !dueDate) return res.status(400).json({ message: "Required fields missing" });
  const task = await Task.create({ title, description, project, assignedTo, dueDate, createdBy: req.user._id });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { assignedTo: req.user._id };
  const tasks = await Task.find(query).populate("project", "name").populate("assignedTo", "name email");
  res.json(tasks);
};

export const updateTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (req.user.role !== "admin" && task.assignedTo.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not allowed" });
  task.status = req.body.status || task.status;
  await task.save();
  res.json(task);
};

export const dashboard = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { assignedTo: req.user._id };
  const tasks = await Task.find(query);
  const today = new Date();
  res.json({
    total: tasks.length,
    completed: tasks.filter(t => t.status === "Completed").length,
    pending: tasks.filter(t => t.status !== "Completed").length,
    overdue: tasks.filter(t => t.status !== "Completed" && new Date(t.dueDate) < today).length
  });
};
