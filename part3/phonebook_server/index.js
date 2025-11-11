// ====== PHONEBOOK SERVER ======

// Import server module
require('dotenv').config()
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

const Person = require('./models/person')

// print all persons on phonebok
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
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
    Person.findById(req.params.id).then(note => {
      res.json(note)
    })
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