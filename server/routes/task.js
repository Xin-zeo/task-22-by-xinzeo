import express from "express";
import {
  addTaskController,
  deleteTaskController,
  getTaskController,
  updateTaskController,
} from "../controllers/task.js";

const router = express.Router();

router.post('/', addTaskController);

router
  .route("/:id")
  .put(updateTaskController)
  .get(getTaskController)
  .delete(deleteTaskController);

export { router as taskRouter };
