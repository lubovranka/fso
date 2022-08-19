require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/mongo')

const app = express()

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :http-version - :response-time :body'))

const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(500).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(500).send({ error: `${Object.values(err['errors'])}` })
    }
    next(err)
}

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        const date = new Date
        response.send(`<p>The phonebook contains ${people.length} contact${people.length > 1 || people.length === 0 ? 's' : ''}</p><p>${date}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => response.json(people))
})

app.post('/api/persons', (request, response, next) => {
    Person.find({}).then(people => {
        const body = request.body
        if (!body.name) {
            response.status(400).json({ error: 'must provide name' })
        } else if (!body.number) {
            response.status(400).json({ error: 'must provide number' })
        } else if (people.some(person => person.name === body.name)) {
            response.status(400).json({ error: 'name must be unique' })
        } else {
            const newPerson = new Person({ ...body, id: Math.floor(Math.random() * 1000000) })
            newPerson.save().then(res => response.json(people.concat(res))).catch(err => next(err))
        }
    })

})

app.use(errorHandler)

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.find({}).then(people => {
        const person = people.find(person => person.id === id)
        if (person) {
            response.json(person)
        } else {
            response.status(404).json({ error: 'person not found' })
        }
    })
        .catch(err => next(err))
})


app.use(errorHandler)

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.find({}).then(people => {
        Person.findByIdAndDelete(id, { runValidators: true })
            .then(() => {
                response.json(people.filter(person => person.id !== id))
            })
            .catch(err => next(err))
    })
})

app.use(errorHandler)

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body
    console.log(body)

    const newPerson = new Person({ ...body, _id: id })
    Person.findByIdAndUpdate(id, newPerson, { new: true })
        .then(() => {
            Person.find({}).then(people => {
                response.json(people)
            })
        })
        .catch(err => next(err))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)