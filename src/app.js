import connectDb from "./config/dbConnect.js";
import express from 'express'
import routes from './routes/index.js'
const connect = await connectDb()

connect.on('error', () => {console.error()})
connect.once('open', () => {
    console.log('rodando mongo')
})

const app = express()
routes(app)


export default app

//TODO: AUTH