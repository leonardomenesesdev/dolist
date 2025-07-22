import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "users"},
    username:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type: String, required: true}
}, {
    Timestamp:true
})

const user = mongoose.model('User', userSchema)
export default user