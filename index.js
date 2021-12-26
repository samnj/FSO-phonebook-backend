require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/phonebook')

app.use(express.json())
app.use(express.static('build'))

morgan.token('postedData', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postedData'))

app.get('/api/people', (req, res) => {
  Person.find({}).then(p => {
    res.json(p)
  })
})

app.get('/info', (req, res) => {
  //TO-DO
})

app.get('/api/people/:id', (req, res) => {
  Person.findById(req.params.id).then(p => {
    res.json(p)
  })
})

app.delete('/api/people/:id', (req, res) => {
  people = people.filter(p => p.id !== Number(req.params.id))
  res.status(204).end()
})

app.post('/api/people', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name missing' })
  } else if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
