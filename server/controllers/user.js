import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userModel } from '../models/user.js'

export const signUpController = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (user) {
        return res.status(409).send();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, 'sercet');
    res.status(201).json({ username, token, userId: newUser._id });
}

export const signInController = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(404).send();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send();
    }

    const token = jwt.sign({ id: user._id }, 'sercet');
    res.json({ username, token, userId: user._id });
}