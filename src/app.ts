import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { routes } from './routes'
import connectDB from './helpers/database'

connectDB()

const port = process.env.PORT || 5001
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req: Request, res: Response, _next: NextFunction) => {
    res.status(200).send({
        message: 'Hallo this is API Express Blog'
    })
})

routes(app)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})