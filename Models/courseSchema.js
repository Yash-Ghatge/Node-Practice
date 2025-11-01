import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name : { type : String , required : true },
    price : { type : Number , required : true },
    inRolled : [
        {
            student : { type : mongoose.Schema.Types.ObjectId , ref : 'user'},
            date : { type : Date , default : Date.now()}
        }
    ]
});

const Course = mongoose.model('course',courseSchema)
export default Course