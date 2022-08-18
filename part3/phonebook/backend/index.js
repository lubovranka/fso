const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { response, request } = require("express")

const app = express()

morgan.token("body", req => {
    return JSON.stringify(req.body)
}) 

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(":method :url :status :http-version - :response-time :body"))

let people = []

app.get("/info", (request, response) => {
    const date = new Date
    response.send(`<p>The phonebook contains ${people.length} contact${people.length > 1 ? "s" : ""}</p><p>${date}</p>`)
})

app.get("/api/persons", (request, response) => {
    response.json(people)
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name) {
        response.status(400).json({ error: "must provide name" })
    } else if (!body.number) {
        response.status(400).json({ error: "must provide number" })
    } else if (people.some(person => person.name === body.name)) {
        response.status(400).json({ error: "name must be unique" })
    } else {
        people.push({ ...body, id: Math.floor(Math.random() * 1000000) })
    }

    response.json(people)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).json({ error: "person not found" })
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)

    response.json(people)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)