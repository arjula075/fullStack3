const mongoose = require('mongoose')

const main = () => {
	
	// test the arguments
	const array = getArguments()
	console.log(array)
	if (array.length > 1) {
		// insert data (and it is by default 1, so we escape the undefined error)
		// luodaan objekti
		// ja samalla tehdään kuten ohjeessa käsketään
		console.log(`lisätään henkilö ${array[0]} numero ${array[1]} luetteloon`)
		const note = new Person({
			name: array[0],
			puh: array[1]
		})
		insertPerson(note)
	}
	else {
		// fetch data
		getPersons()
	}

	
}

const Person = mongoose.model('Person', {
  name: String,
  puh: String
})

const insertPerson = (person) => {
	console.log(person)
	// get the password
	let psw = ''
	fs = require('fs');
	fs.readFile('password.txt', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		const url = `mongodb://admin:${data}@ds229790.mlab.com:29790/full_stack_test`
		console.log(url);
		
		mongoose.connect(url)
		person
		.save()
			.then(response => {
				console.log('note saved!')
				mongoose.connection.close()
			})
	
	})
}

const getPersons = () => {
		// get the password
	let psw = ''
	fs = require('fs');
	fs.readFile('password.txt', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		const url = `mongodb://admin:${data}@ds229790.mlab.com:29790/full_stack_test`
		console.log(url);
		
		mongoose.connect(url)
		console.log('Puhelinluettelo')
		Person
		.find({})
			.then(result => {
				result.forEach(note => {
				console.log(`${note.name} ${note.puh}`)
			})
			mongoose.connection.close()
		})
	
	})
	
}	

const getArguments = () => {
	const array = []
	process.argv.forEach((val, index) => {
		if (index > 1) {
			array.push(val)
		}
	});
	return array
}



main()










