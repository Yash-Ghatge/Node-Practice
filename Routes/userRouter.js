import express from 'express'
import { login, logout, register, Update } from '../Controller/userController.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/update/:id',Update)
userRouter.post('/logout',logout)
export default userRouter