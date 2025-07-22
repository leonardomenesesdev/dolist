import task from "../model/task.js";

class TaskController{
    static async getTasks(req, res){
        try {
            const tasksList = await task.find().where({userId: req.user.id})
            res.status(200).json(tasksList)
        } catch (error) {
            res.status(500).json({message: `${error.message}`})
        }
    }
    
    static async getTaskById(req, res){
        try {
            const id = req.params.id
            const selectedTask = await task.findById(id)
            if(!selectedTask){
                return res.status(404).json({message: `Task not found`})
            }
            if(selectedTask.userId.toString() !== req.user.id){
                res.status(403).json({message: `Unauthorized user`})
            }
            return res.status(200).json(selectedTask)
        } catch (error) {
            
        }
    }

    static async postTask(req, res){
        try {
          const taskData = {
            ...req.body, userId: req.user.id
          }
          const newTask = await task.create(taskData)
          res.status(201).json({ message: `${newTask} created`})
        } catch (error) {
            res.status(500).json({message: `${error.message}`})
        }
    }

    static async updateTask (req, res){
        try {
            const id = req.params.id
            const taskToUpdate = await task.findById(id)
            if (!taskToUpdate) {
                return res.status(404).json({message: "Task not found"})
            }
            if(taskToUpdate.userId.toString() !== req.user.id){
                res.status(403).json({message: "Unauthorized user"})
            }
            const updated = await task.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json({message:`${updated}`})

        } catch (error) {
            res.status(500).json({message: `${error.message}`})            
        }
    }

    static async deleteTask (req, res) {
        try {
            const id = req.params.id
            const taskToDelete = await task.findById(id)
            if (!taskToDelete) {
                return res.status(404).json({message: "Task not found"})
            }
            if(taskToDelete.userId.toString() !== req.user.id){
                res.status(403).json({message: `${req.user.username} is not authorized to delete this task`})
            }
            await task.findByIdAndDelete(id)
            res.status(200).json({message: "deleted"})
        } catch (error) {
            res.status(500).json({message: `${error.message}`})            
        }
    }

}   

export default TaskController