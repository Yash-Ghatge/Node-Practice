import Course from "../Models/courseSchema.js"


export const course = async ( req , res ) => {
    try {
        const { name , price } = req.body
        if ( !name || !price ) {
            return res.status(400).json({success : false , message : 'Missing Details'})
        }

        const newcourse = new Course({ name , price})
        const course = await newcourse.save()

        
        res.status(400).json({success : true , course : course })
    } catch (error) {
        console.log(error)
        res.status(500).json({success : false , message : 'Internal Server'})
    }
}

export const getcourse = async ( req , res ) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 5
        const skip = (page - 1) * limit

        const courses = await Course.find().skip(skip).limit(limit)
        if (!courses) {
            return res.status(400).json({success:true,data:courses})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error',success:false})
    }
}