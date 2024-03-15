import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

export const taskModel = mongoose.model('tasks', taskSchema);