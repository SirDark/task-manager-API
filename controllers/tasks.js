const taskSchema = require('../models/task')

const getAllTasks = async (req,res) => {
    try {
        const tasks = await taskSchema.find({})
        res.status(201).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createTask = async (req,res) => {
    try {
        const task = await taskSchema.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getTask = async (req,res) => {
    try {
        const {id: taskID} = req.params
        const task = await taskSchema.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg:'no task with the given id'})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateTask = async (req,res) => {
    try {
        const {id: taskID} = req.params
        const task = await taskSchema.findOneAndUpdate({_id:taskID}, req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            return res.status(404).json({msg:'no task with the given id'})
        }
        res.status(200).json({id:taskID, data:req.body})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTask = async (req,res) => {
    try {
        const {id: taskID} = req.params
        const task = await taskSchema.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(404).json({msg:'no task with the given id'})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}