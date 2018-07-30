const http = require('http')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('payload', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :payload :status :response-time ms'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
	//console.log(req)
	console.log('kukkuluuruu')
	res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id)
  .then(person => {
	response.json(formatPerson(person))
  })

})

app.get('/info', (request, response) => {

  persons = getPersons()
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

  
    Person
	    .findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => {
			response.status(400).send({ error: 'malformatted id' })
		})
  
})

app.put('/api/persons/:id', (request, response) => {

  const updatedPerson = request.body
  const id = Number(request.params.id)
  let result = ''
  const person = persons.find(person => person.id === id )
  if (person) {
	    let index = persons.indexOf(person)
	    let pivotPerson = persons.splice(index, 1)
	    //console.log(pivotPerson)
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
	  note.id = id
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
			const person = new Person({
				name: note.name,
				puh: note.puh
			})
			person
			.save()
			.then(response => {
				//console.log('note saved!')
				mongoose.connection.close()
				persons = getPersons()
			})
      return response.json(note)
		}
  }
  else {
	  return response.status(400).json({error: 'content missing'})

  }

})

const getPersons = () => {
	let array = []
	Person
		.find({})
			.then(result => {
					// well, it works as stated in the excercise, but
					// not as it should. For some reason, the obj is returned empty, if tried to return from here
					obj =  result.map(Person.format)
					//console.log("obj", obj.length)
					result.forEach(note => {
						array.push(formatPerson(note))
					})
			})
	//console.log("array", array.length)	
	return array
}

const formatPerson = (note) => {
  return {
    name: note.name,
    puh: note.puh,
    id: note._id
  }
}

let persons = getPersons()

const interval = setInterval(function(){
	//console.log('pr', persons)
	if (typeof persons === 'undefined' || persons.length == 0) {
		persons = getPersons()
		console.log('persons after fetch', persons)
	}
	else {
		//console.log(persons)
		clearInterval(interval)
	}
}, 1000)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
