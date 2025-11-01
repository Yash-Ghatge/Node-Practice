import express from 'express'
import { course } from '../Controller/courseController.js'


const courseRouter = express.Router()

courseRouter.post('/register',course)


export default courseRouter