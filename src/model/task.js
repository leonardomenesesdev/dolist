import mongoose from "mongoose"; 

const taskSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId},
    name:{type: String, required: true},
    description: {type: String},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'medium'},
    status: {type: String, enum: ['todo', 'doing', 'done'], default: 'todo'},
    createdAt: {type: Date, default: Date.now}
}, {versionKey: false});

const task = mongoose.model('tasks', taskSchema)
export default task