import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

//middleware
app.use(express.json()) /* Tells Express: “For every incoming request, if the body is JSON (e.g. Content-Type: application/json), read it and parse it.”

After this runs, the parsed data is available as req.body in your routes.

Without express.json(), req.body would be undefined for JSON requests unless you used some other body-parsing middleware.
*/

app.use((req, res, next) => { //resp time tracker
    const start = Date.now()
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} | Response time: ${Date.now()-start}ms`)
    })
    next()
})

app.use('/api/notes', notesRoutes)

app.listen(PORT, () => {
    console.log('Server started on PORT:', PORT)
})