import express from 'express'
import { AllProfile, login, logout, Profile, register, Update } from '../Controller/userController.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/update/:id',Update)
userRouter.post('/logout',logout)
userRouter.get('/Allprofile',AllProfile)
userRouter.get('/profile/:id',Profile)

export default userRouter