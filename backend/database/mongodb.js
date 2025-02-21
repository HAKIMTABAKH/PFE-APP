import mongoose from 'mongoose';
import {DB_URI ,NODE_ENV} from "../config/env.js";

if(!DB_URI) {
    throw new Error('MongoDB URI doesn\'t exist!');
}
//connect to mongodb
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB Connected in ${NODE_ENV} mode`);
    }catch(error) {
        console.log("error in connectToDatabase" , error);
        process.exit(1);
    }
}
export default connectToDatabase;