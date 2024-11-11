import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    due: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true })

export const Task = mongoose.model("Task", TaskSchema)