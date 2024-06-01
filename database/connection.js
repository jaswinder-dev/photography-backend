import mongoose from "mongoose";

//connecting to database
const connection = () => {
    return mongoose.connect(process.env.MONGO_URL, {
        dbName: process.env.DATABASE
    });
};

export default connection;