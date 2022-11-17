const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./models/todos')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/mern-todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to database')).catch(console.error)

app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.post('/todo/new', async (req, res) => {
    const todo = await new Todo({
        text: req.body.text

    })

    todo.save()
    res.send(todo)
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    todo.save()
    res.json(todo)
})

app.delete('/todo/delete/:id', async (req, res) => {
    const deletetodo = await Todo.findByIdAndDelete(req.params.id)
    res.send('deleted')
})





app.listen(4000, () => {
    console.log("server started");
})