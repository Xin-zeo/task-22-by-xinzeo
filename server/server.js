import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/user.js'
import { taskRouter } from './routes/task.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/tasks', taskRouter);

mongoose.connect('mongodb+srv://xinzeo:OpenProject@what-to-do.owq3vmi.mongodb.net/appdb?retryWrites=true&w=majority&appName=what-to-do');

app.listen(port, () => {
    console.log("Server Started!!");
})