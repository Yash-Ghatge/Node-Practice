import User from "../Models/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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