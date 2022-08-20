const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blog')
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body
    if (!username || !password) {return res.status(400).json({error: 'must provide username and password'})}
    if (username.length < 4) {
        return res.status(400).json({error: 'username must be longer than 3 characters'})
    } else if (password.length < 4) {
        return res.status(400).json({error: 'password must be longer than 3 characters'})
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({
        error: 'username must be unique'
        })
    }

    const saltRounds = 14
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, 
        name,
        passwordHash
    })

    const savedUser = user.save()
    res.status(201).json(savedUser)
})

module.exports = usersRouter