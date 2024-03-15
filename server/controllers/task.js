import { taskModel } from '../models/task.js'

export const addTaskController = async (req, res) => {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).send();
}

export const updateTaskController = async (req, res) => {
    const _id = req.params.id;
    const task = await taskModel.findByIdAndUpdate(_id, req.body);
    if (!task) {
        return res.status(500).send();
    }
    res.send();
}

export const getTaskController = async (req, res) => {
    const user = req.params.id;
    const tasks = await taskModel.find({user});
    res.json(tasks);
}

export const deleteTaskController = async (req, res) => {
    const _id = req.params.id;
    const task = await taskModel.findByIdAndDelete(_id);
    if (!task) {
        return res.status(500).send();
    }
    res.send();
}