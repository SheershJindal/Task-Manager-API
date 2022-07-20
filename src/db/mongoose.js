const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/task-manager-api')

// const me = new User({
//     name: 'Sheersh',
//     email: 'sheersh@fakegmail.com',
//     age: 19
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((err) => {
//     console.log(err)
// })

// const task = new Task({
//     description: 'Coding Backend',
//     default: false
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err)
// })