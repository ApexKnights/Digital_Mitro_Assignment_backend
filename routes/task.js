import express from "express"
import { IsAuthenticated } from "../auth/authenticate.js";
import { Task } from "../models/Task.js";




const router = express.Router();



router.post("/addtask", IsAuthenticated, async (req, res) => {
    try {
        const { title, desc, due, status, userId } = req.body;
        const createTask = await Task.create({
            title,
            desc,
            due,
            status,
            userId
        });
        res.status(201).json({
            success: true,
            response: "Task Has been Created",
            task: createTask,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: "Something Went Wrong",
        })
    }
})



router.put("/edittask/:id", IsAuthenticated, async (req, res) => {
    try {
        const updatePost = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(201).json({
            success: true,
            message: updatePost,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        console.log(error)
    }
})


router.get("/alltasks/:id", IsAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.id });
        res.status(200).json({
            success: true,
            response: tasks

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})

router.get("/getatask/:id", IsAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.findOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            response: tasks

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})



router.delete('/deletetask/:id', IsAuthenticated, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            response: "Post Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
})




export default router;