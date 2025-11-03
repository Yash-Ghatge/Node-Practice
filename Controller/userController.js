import User from "../Models/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Course from "../Models/courseSchema.js"


export const register = async ( req , res ) => {
    try {
        const { name , email , password } = req.body

        if ( !name || !email || !password) {
            return res.status(400).json({message:'Fill All Details'})
        }

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message:'Email Used'})
        }

        const hashpassword = await bcrypt.hash(password,10)
        const newuser = new User({name , email , password : hashpassword})
        const user = await newuser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:"7d"})
        res.cookie('token',token,{
            httpOnly : true ,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({message:'Register Success',success:true,user:user,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}

export const login = async ( req , res ) => {
    try {
        const { email , password } = req.body

        if ( !email || !password) {
            return res.status(400).json({message:'Invailid Email Or Password'})
        }

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message:'User Not Found'})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(400).json({message:'Invailid Email Or Password'})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:"7d"})
        res.cookie('token',token,{
            httpOnly : true ,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({message:'Login Success',success:true,user:user,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}


export const Update = async ( req , res ) => {
    try {
        const userId = req.userId
        const updatedData = req.body

        const user = await User.findByIdAndUpdate(userId,updatedData)
        if (!user) {
            return res.status(400).json({message:'User Not Found'})
        }

        res.status(200).json({message:'Update Success',success:true , user : user})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}

export const logout = async ( req , res ) => {
    try {
        res.clearCookie('token',{
            httpOnly : true
        })
        res.status(200).json({message:'LogOut Success',success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}

export const AllProfile = async ( req , res ) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 2
        const skip = (page - 1) * limit
        const users = await User.find().skip(skip).limit(limit)
        if (users.length === 0) {
            return res.status(400).json({message:'Users Not Found'})
        }
        res.status(200).json({message:'Success',success:true,data:users})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}

export const Profile = async ( req , res ) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({message:'User Not Found'})
        }
        res.status(200).json({message:'Success',success:true,data:user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}

export const inRoll = async ( req , res ) => {
    try {
        const userId = req.userId
        const courseId = req.params.id

        const user = await User.findById(userId)
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json({message:'Course Not Found'})
        }

        course.inRolled.push({ student : user._id})
        await course.save()

        user.inRolled.push({ course : course._id})
        await user.save()

        res.status(200).json({success:true,message:"Inrolled in course successfully",data:[user,course]})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}