import express from 'express'
import taskRoutes from './taskRoutes.js'

const routes = (app) => {
    app.use(express.json(), taskRoutes)
    app.route('/').get((req, res) => {
        res.status(200).send("live")

    })
   
}

export default routes