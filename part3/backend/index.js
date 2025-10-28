// ======== Estrucutura principal de un servidor =========


// Importamos el modulo del server web
const express = require('express')
const app = express() 

const cors = require('cors')
app.use(cors())

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  }else{
    res.statusMessage = "This note dont exist"
    res.status(400).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) =>{

  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error : 'content missing'
    })
  }

  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

  const note = {
    content : body.content,
    important: Boolean(body.important) || false,
    id: maxId,
  }
  note.id = maxId + 1

  notes = notes.concat(note)

  res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})