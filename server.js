import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./db.js"
import 'dotenv/config'
import userRouter from "./Routes/userRouter.js"
import courseRouter from "./Routes/courseRouter.js"

const app = express()

connectDB()
app.use(express.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use('/course',courseRouter)
app.get('/',(req,res)=>{
    res.send("API IS WORKING ON PORT 3000")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})