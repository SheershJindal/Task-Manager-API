const express = require('express')
const Task = require('../models/task')

const router = express.Router()

//Task create
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

//Task get all
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})

//Task get single
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch (err) {
        res.status(500).send(err)
    }
})

//Task update
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidCheck = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidCheck) {
        return res.status(400).send('Invalid Update')
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch (err) {
        res.status(400).send(err)
    }
})

//Task delete
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router