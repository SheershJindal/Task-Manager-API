const express = require('express')
const User = require('../models/user.js')

const router = express.Router()


//User create
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

//User get all
router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

//User get single
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (err) {
        res.status(500).send(err)
    }
})

//User update
router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidCheck = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidCheck) {
        return res.status(400).send('Invalid update')
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (err) {
        res.send(400).send(err)
    }
})

//User delete
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (err) {
        res.status(500).send()
    }
})


module.exports = router