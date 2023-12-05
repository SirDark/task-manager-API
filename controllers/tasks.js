const taskSchema = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async (req,res) => {
    const tasks = await taskSchema.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req,res) => {
    const task = await taskSchema.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper(async (req,res, next) => {
        const {id: taskID} = req.params
        const task = await taskSchema.findOne({_id:taskID})
        if(!task){
            return next(createCustomError('no task with the given id', 404))
        }
        res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req,res) => {
        const {id: taskID} = req.params
        const task = await taskSchema.findOneAndUpdate({_id:taskID}, req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            return next(createCustomError('no task with the given id', 404))
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req,res) => {
        const {id: taskID} = req.params
        const task = await taskSchema.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError('no task with the given id', 404))
        }
        res.status(200).json({task})
})

const editTask = asyncWrapper(async (req,res) => {//patch wil update put will overwrite
        const {id: taskID} = req.params
        const task = await taskSchema.findOneAndUpdate({_id:taskID}, req.body,{
            new:true,
            runValidators:true,
            overwrite: true
        })
        if(!task){
            return next(createCustomError('no task with the given id', 404))
        }
        res.status(200).json({id:taskID, data:req.body})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
}