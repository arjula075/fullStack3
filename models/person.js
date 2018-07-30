const mongoose = require('mongoose')

const initiateConnection = () => {
	try {
		let url = undefined
		console.log('process.env.NODE_ENV', process.env.NODE_ENV)
		if ( process.env.NODE_ENV === 'production' ) {
			console.log('in production')
			require('dotenv').config()
			url = process.env.MONGODB_URI
			console.log('url', url)
			mongoose.connect(url)
		}
		else {
			// get the password
			console.log('somewhere else')
			console.log('getting password')
			let psw = ''
			fs = require('fs');
			fs.readFile('password.txt', 'utf8', function (err,data) {
				console.log('password getting',err, data)
				if (err) {
					return console.log(err);
				}
				url = `mongodb://admin:${data}@ds229790.mlab.com:29790/full_stack_test`	
				console.log('url', url)
				mongoose.connect(url)
			})
		}

	}
	catch (e) {
		console.log(e)
	}
}

initiateConnection()

const personSchema = new mongoose.Schema({
  name: String,
  puh: String,
  id: Number
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