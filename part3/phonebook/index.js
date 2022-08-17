const { response, request } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/info", (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`)
})

app.get("/api/persons", (request, response) => {
    response.json(people)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  people = people.filter(person => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.number) {
    response.status(400).json({ error: "must provide number" }).end()
  } else if (people.some(person => person.name === body.name)) {
    response.status(400).json({ error: "name must be unique" }).end()
  }

  people.push({...body, id: Math.floor(Math.random() * 1000000)})

  response.json(people)
})

const PORT = 3001
app.listen(PORT)