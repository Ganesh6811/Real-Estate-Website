import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import ConnectDB from "./lib/ConnectDb.js";
import authRoute from "./Routes/auth.route.js";
import postRoute from "./Routes/post.route.js";
import userRoute from "./Routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "https://real-estate-website-tau-one.vercel.app", 
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],   
    allowedHeaders: ["Content-Type", "Authorization"],  
}))

app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);


app.listen(port, ()=>{
    console.log(`Server is working on port ${port}`);
    ConnectDB();
});
