const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, likes: 1, url: 1 })

    res.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password === undefined) {
    return response.status(400).json({ error: 'password mustn`t be empty'})
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be more da 3 characters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter