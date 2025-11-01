import jwt from 'jsonwebtoken'

export const auth = async (req,res,next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(400).json({success:false,message:"Unauthorized"})
        }

        const decode = jwt.verify(token,process.env.JWT_KEY)
        if (!decode.id) {
            return res.status(400).json({success:false,message:"Invailid Token"})
        }

        req.userId = decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}