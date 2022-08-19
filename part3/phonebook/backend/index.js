require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const Person = require('./models/mongo')

const app = express()

morgan.token("body", req => {
    return JSON.stringify(req.body)
}) 

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(":method :url :status :http-version - :response-time :body"))

app.get("/info", (request, response) => {
    Person.find({}).then(people => {
        const date = new Date
        response.send(`<p>The phonebook contains ${people.length} contact${people.length > 1 ? "s" : ""}</p><p>${date}</p>`)
    })
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then(people => response.json(people))
})

app.post("/api/persons", (request, response) => {
    Person.find({}).then(people => {
        const body = request.body
        if (!body.name) {
            response.status(400).json({ error: "must provide name" })
        } else if (!body.number) {
            response.status(400).json({ error: "must provide number" })
        } else if (people.some(person => person.name === body .name)) {
            response.status(400).json({ error: "name must be unique" })
        } else {
            newPerson = new Person({ ...body, id: Math.floor(Math.random() * 1000000) })
            newPerson.save().then(res => response.json(people.concat(res)))
        }
    })
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    Person.find({}).then(people => {
        const person = people.find(person => person.id === id)
        if (person) {
            response.json(person)
        } else {
            response.status(404).json({ error: "person not found" })
        }
    })
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)

    response.json(people)
})

const PORT = process.env.PORT
app.listen(PORT)