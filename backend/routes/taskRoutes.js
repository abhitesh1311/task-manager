import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

router.get("/", async (req, res) => {
  const tasks = await Task.find()
    .populate("project")
    .populate("assignedTo");
  res.json(tasks);
});

router.get("/dashboard", async (req, res) => {
  const total = await Task.countDocuments();
  const completed = await Task.countDocuments({ status: "Completed" });
  const pending = await Task.countDocuments({ status: "Pending" });

  res.json({ total, completed, pending, overdue: 0 });
});

router.put("/:id/status", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json("Updated");
});

export default router;