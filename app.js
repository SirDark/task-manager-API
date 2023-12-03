require('dotenv').config()
const express = require('express')
app = express()
const taskRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')

const PORT = 5000

//middleware
app.use(express.json())
//routes
app.use('/api/v1/tasks', taskRoutes)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, (_,__) => {
            console.log('server is listening on port ' + PORT + '...')
        })
    } catch (error) {
        console.log(error)
    }
}

start()

