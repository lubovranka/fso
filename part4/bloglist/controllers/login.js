const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({error: 'must provide username and password'})
    }

    const user = await User.findOne({ username })
    const correctPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!user || !correctPassword) {
        return res.status(401).json({error: "invalid username or password"})
    }

    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200).json({ token, username: user.username, name: user.name})
})

module.exports = loginRouter