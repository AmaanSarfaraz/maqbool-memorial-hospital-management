import mongoose from 'mongoose';
import { DB_NAME } from '../services/constants.js';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Database connected to ${DB_NAME}`);

    } catch (error) {
        console.error(`Error connecting to Database: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
