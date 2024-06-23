import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async()=>{
    try {
        console.log(process.env.MONGO_URI,DB_NAME)
       const connection= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       console.log(`MongoDb is connected`)
    } catch (error) {
        console.log("Failed to connect the DataBase:",error)
        process.exit(1);
    }
}

export default connectDB