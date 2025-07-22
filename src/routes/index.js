import express from 'express'
import taskRoutes from './taskRoutes.js'
import userRoutes from './userRoutes.js'
const routes = (app) => {
    app.use(express.json(), userRoutes)
    app.use(express.json(), taskRoutes)
    app.route('/').get((req, res) => {
        res.status(200).send("live")
    })
}

export default routes