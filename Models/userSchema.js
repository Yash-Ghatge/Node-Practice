import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : { type : String , required : true },
    email : { type : String , required : true },
    password : { type : String , required : true },
    inRolled : [
        {
            course : { type : mongoose.Schema.Types.ObjectId , ref : 'course'},
            date : { type : Date , default : Date.now()}
        }
    ]
});

const User = mongoose.model('user',userSchema)
export default User