import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

router.get("/", async (req, res) => {
  const projects = await Project.find().populate("members");
  res.json(projects);
});

export default router;