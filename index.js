const http = require('http')
const express = require('express')
const app = express()

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

app.get('/notes', (req, res) => {
	console.log(req)
	res.json(persons)
})

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  console.log(persons)
  const person = persons.find(person => person.id === id )
  console.log(person)
  if (person) {
	  response.json(person)
  }
  else {
	  response.status(404).end()
  }
  
})


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)