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
app.get('/api/persons', (req, res, next) => {
    Person.find({})
      .then(persons => {
        if (persons){
          res.json(persons)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
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
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
    })
      .catch(error => next(error))
})

// delete person of phonebook by id
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

// add person to phonebook
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number){
        return res.status(400).json({
            error: 'No name or number'
        })
    }
    
    const id = Math.floor(1000 + Math.random() * 9000);

    const person = new Person({
      id: id,
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
})

//update person on phonebook
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(uddatedPerson => {
      res.json(udpatePerson)
    })
    .catch(error => next(error))
})

// Init server on port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})