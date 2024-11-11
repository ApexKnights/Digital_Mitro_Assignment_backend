import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js"
import taskRouter from "./routes/task.js"
import cors from "cors"

const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}))

dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/tasks", taskRouter)


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { dbName: "TaskApp" })
        console.log("Databse is connected successfully")
    } catch (error) {
        console.log(error)
    }
}






app.listen(8000, () => {
    console.log("App Listening");
    connectDb();
})