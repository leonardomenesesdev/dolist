import express from 'express'
import taskRoutes from './taskRoutes.js'
import userRoutes from './userRoutes.js'
const routes = (app) => {
    app.use(express.json())
    app.use('/api', userRoutes)
    app.use('/api', taskRoutes)
    app.route('/api').get((req, res) => {
        res.status(200).send("live")
    })
}

export default routes