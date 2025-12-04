import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve();

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

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173'
  }));
}
app.use(rateLimiter)
app.use('/api/notes', notesRoutes)

if (process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });

}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
};

startServer(); 