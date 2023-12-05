const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'must provide name'],
        trim:true,
        maxlength:[20, 'name can not be more than 20 characters'],
        minlength:[2, 'name must be at least 2 character long']
    },
    completed: {
        type: Boolean,
        required:[true, 'must provide if completed or not']
    }
})

module.exports = mongoose.model('Task', TaskSchema)
