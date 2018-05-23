const mongoose = require('mongoose')

const initiateConnection = () => {
	try {
		// get the password
		console.log('getting password')
		let psw = ''
		fs = require('fs');
		fs.readFile('password.txt', 'utf8', function (err,data) {
			console.log('password getting',err, data)
			if (err) {
				return console.log(err);
			}
		const url = `mongodb://admin:${data}@ds229790.mlab.com:29790/full_stack_test`
		console.log(url)
		mongoose.connect(url)
		})
	}
	catch (e) {
		console.log(e)
	}
}

initiateConnection()

const personSchema = new mongoose.Schema({
  name: String,
  puh: String
})

 personSchema.statics.format = function(person) {
    const obj =  { 
		name: person.name,
		puh: person.puh,
		id: person._id
	}
	return obj
};

const Person = mongoose.model('Person', personSchema)

module.exports = Person