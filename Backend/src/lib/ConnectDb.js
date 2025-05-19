import mongoose from "mongoose";

const ConnectDB = async(req, res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log("Database Connected.....");
    }
    catch(err){
        console.log("Error in connecting the mongoDB:", err);
        res.status(400).json({message:"Internal Server Error"});
    }
}

export default ConnectDB;