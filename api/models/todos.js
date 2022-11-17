const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const schema = mongoose.Schema

const todoSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timeStamps: {
        type: String,
        default: Date.now()
    }
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo;
