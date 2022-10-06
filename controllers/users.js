const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => { 
    console.log('🚀 ~ usersRouter.post ~ request.body', request.body)
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser) { 
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (resquest, response) => { 
    const users = await User
        .find({}).populate('notes', { content: 1, date: 1 })
    response.json(users)
})

module.exports = usersRouter
