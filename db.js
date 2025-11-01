import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/practice")
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
        console.log("Database disconnected")
    }
}