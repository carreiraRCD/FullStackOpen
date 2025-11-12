const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length===3){
    const password = process.argv[2]

    const url =
    `mongodb+srv://phonebook:${password}@phonebook.31qyytw.mongodb.net/?appName=phonebook`

    mongoose.set('strictQuery',false)

    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

    const Person = mongoose.model('Person', personSchema)
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log("\t"+person.name+" "+person.number);
        })
        mongoose.connection.close()
    })
}

if (process.argv.length>3){
    const password = process.argv[2]

    const url =
    `mongodb+srv://phonebook:${password}@phonebook.31qyytw.mongodb.net/?appName=phonebook`

    mongoose.set('strictQuery',false)

    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(() => {
        console.log('person added')
        mongoose.connection.close()
    })
}