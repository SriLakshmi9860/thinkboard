

import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8","8.8.8.4"]);
export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.mongo_uri);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);//exit with failure

    }

};