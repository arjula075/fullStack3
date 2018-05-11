const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = 
   [
    {
      "name": "Arto Hellas",
      "puh": "123434",
      "id": 1
    },
    {
      "name": "Bertil Hellas",
      "puh": "123434",
      "id": 2
    },
    {
      "name": "Cecilia Hellas",
      "puh": "123434",
      "id": 3
    },
    {
      "name": "David Hellas",
      "puh": "123434",
      "id": 4
    },
    {
      "name": "Esko Hellas",
      "puh": "123434",
      "id": 5
    },
    {
      "name": "Fiona Hellas",
      "puh": "123434",
      "id": 6
    },
    {
      "name": "Maija",
      "puh": "34234324",
      "id": 9
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
	console.log(req)
	res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  console.log(persons)
  const person = persons.find(person => person.id === id )
  console.log(person)
  if (person) {
	  let result = `<h1>Henkilö</h1><p>${person.name}</p><p>${person.puh}</p>`
	  response.send(result)
  }
  else {
	  response.status(404).end()
  }
  
})

app.get('/info', (request, response) => {

  if (persons) {
	  let numberOfNames = persons.length
	  let result = `<h1>Info!</h1><p>luettelossa nimiä ${numberOfNames}</p><p>${new Date()}</p>`
	  response.send(result)
  }
  else {
	  response.status(404).end(result)
  }
  
})

app.delete('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )
  if (person) {
	let index = persons.indexOf(person)
	persons.splice(index, 1)
	console.log(persons)
	response.sendStatus(204)
  }
  else {
	  response.status(404).end(result)
  }
  
})

app.post('/api/persons', (request, response) => {

  const note = request.body
  const id = Math.floor(Math.random() * 9007199254740990);
  if (note) {
	note.id = id
	console.log(note)
	persons.push(note)
	console.log(persons)
	response.sendStatus(204)
  }
  else {
	  response.status(404).end()
  }
  
})



const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)