import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // O campo 'user_id' foi removido. O Mongoose cuidará do '_id' automaticamente.
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    // CORREÇÃO AQUI: 'timestamps' em minúsculo e no plural
    timestamps: true 
})

const user = mongoose.model('User', userSchema)
export default user