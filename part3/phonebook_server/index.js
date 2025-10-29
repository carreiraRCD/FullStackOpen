// ====== PHONEBOOK SERVER ======

// Import server module

const express = require('express')
const morgan = require('morgan')
const app = express() 

app.use(express.json())
app.use(express.static('dist'))

// token for body
morgan.token('body', (req) => JSON.stringify(req.body))

// morgan for GET
app.use(
  morgan('tiny', {
    skip: (req) => req.method !== 'GET'   // solo para GET
  })
)

// morgan for POST
app.use(
  morgan(':method :url :status :response-time ms - body: :body', {
    skip: (req) => req.method !== 'POST'  // solo para POST
  })
)

let persons = [
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

// print all persons on phonebok
app.get('/api/persons', (req, res) => {
    res.send(persons)
})

// print info of the server
app.get('/info', (req, res) => {
    const time = new Date()
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>
    `)
})

//print one single persons from phonebook by id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person){
        res.json(person)
    }else{
        res.statusMessage = "No person with this id"
        res.status(400).end()
    }
})

// delete person of phonebook by id
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

// add person to phonebook
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number){
        return res.status(400).json({
            error: 'No name or number'
        })
    }
    
    if(persons.filter(p => p.name === body.name).length > 0){
        return res.status(400).json({
            error: 'Must be unique'
        })
    }
    const id = Math.floor(1000 + Math.random() * 9000);

    const person = {
        id: id,
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    res.json(person)
})

// Init server on port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})