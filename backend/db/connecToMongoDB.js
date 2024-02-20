import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('Connect to MongoDb')
    } catch (err) {

    }
}
export default connectToMongoDB