require('dotenv').config()
const express = require('express')
app = express()
const taskRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const PORT = process.env.PORT || 5000

//middleware
app.use(express.static('./public'))
app.use(express.json())
//routes
app.use('/api/v1/tasks', taskRoutes)
app.use(notFound)
app.use(errorHandlerMiddleware)

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

