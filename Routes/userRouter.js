import express from 'express'
import { AllProfile, inRoll, login, logout, Profile, register, Update } from '../Controller/userController.js'
import { auth } from '../Middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.put('/update',auth,Update)
userRouter.post('/logout',logout)
userRouter.get('/Allprofile',AllProfile)
userRouter.get('/profile',auth,Profile)
userRouter.post('/inroll/:id',auth,inRoll)

export default userRouter