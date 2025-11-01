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