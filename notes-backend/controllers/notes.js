const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log('🚀 ~ getTokenFrom ~ authorization', authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
        .populate('user', { username: 1, name: 1 })
    
    response.json(notes)
})

notesRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('🚀 ~ notesRouter.post ~ request', body)
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id
    })
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    
    response.status(201).json(savedNote)
})

notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note.toJSON())
    } else {
        response.status(404).end()
    }

})

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((updatedNote) => {
            response.json(updatedNote)
        })
        .catch((error) => next(error))
})

module.exports = notesRouter
