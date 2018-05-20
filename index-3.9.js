const http = require('http')
const express = require('express')
var morgan = require('morgan')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

morgan.token('payload', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :payload :status :response-time ms'))

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
  const person = persons.find(person => person.id === id )
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

app.put('/api/persons/:id', (request, response) => {

  const updatedPerson = request.body
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )
  if (person) {
	    let index = persons.indexOf(person)
	    let pivotPerson = persons.splice(index, 1)
	    console.log(pivotPerson)
      pivotPerson.name = updatedPerson.name
      pivotPerson.puh = updatedPerson.puh
      persons.push(pivotPerson)
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
	  const searchArray = persons.map(function(e) { return e.name; })
	  if (!note.name) {
		   //console.log('note has no name', note)
		  return response.status(400).json({error: 'name missing'})
	  }
	  else if (!note.puh) {
		 //console.log('note has no puh', note)
		 return response.status(400).json({error: 'puh missing'})

	  }
	  else if (searchArray.indexOf(note.name) > 0) {
			//console.log('SAME exists', note)
			return response.status(400).json({error: 'person already exists'})
	  }
	  else {
		  	//console.log('ok to add', note)
			note.id = id
			persons.push(note)
			console.log(persons)
      return response.json(note)
		}
  }
  else {
	  return response.status(400).json({error: 'content missing'})

  }

})



const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
