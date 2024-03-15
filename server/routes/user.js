import { signInController, signUpController } from '../controllers/user.js'
import express from 'express'

const router = express.Router();

router.post('/signUp', signUpController);

router.post('/signIn', signInController);

export {router as userRouter}