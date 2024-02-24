import dotenv from "dotenv";
// import connectDB from "./db/DB_connect.js";
// import mongoose from "mongoose";
// import DB_NAME from "./constants.js";
// import  express  from "express";
// import cors from "cors";
import { app } from "./app.js";
// const app = express();

dotenv.config({
    path: "../../.env"
}); // to use the .env file


app.listen(process.env.PORT || 8000,()=>{ // app.listen is used to listen to the port
    console.log(`Server is running on PORT: ${process.env.PORT}`);
})