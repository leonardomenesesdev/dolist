import connectDb from "./config/dbConnect.js";
import express from 'express'
import task from "./model/task.js";

const connect = await connectDb()

connect.once('open', () => {
    console.log('rodando mongo')
})

const app = express()
app.use(express.json())

app.get('/test', async (req, res)=>{
    const tasksList = await task.find()
    res.status(200).json(tasksList)
})

export default app