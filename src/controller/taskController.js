import task from "../model/task.js";

class TaskController{
    static async getTasks(req, res){
        try {
            const tasksList = await task.find()
            res.status(200).json(tasksList)
        } catch (error) {
            res.status(500).json({message: `${error.message}`})
        }

    }

    static async postTask(req, res){
        try {
          const newTask = await task.create(req.body)
          res.status(201).json({ message: `${newTask} created`})
        } catch (error) {
            res.status(500).json({message: `${error.message}`})
        }
    }

    static async updateTask (req, res){
        try {
            const id = req.params.id
            await task.findByIdAndUpdate(id, req.body)
            res.status(200).json({message: "updated"})

        } catch (error) {
            res.status(500).json({message: `${error.message}`})            
        }
    }

    static async deleteTask (req, res) {
        try {
            const id = req.params.id
            await task.findByIdAndDelete(id)
            res.status(200).json({message: "deleted"})
        } catch (error) {
            res.status(500).json({message: `${error.message}`})            
        }
    }

}   

export default TaskController