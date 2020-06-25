const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0-ff71i.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
} else if (process.argv.length === 3) {
  console.log('Fetching people from phonebook...');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  console.log(
    'Please provide name AND number as an arguments: node mongo.js <password> <name> <number>'
  );
  process.exit(1);
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const randomId = Math.floor(Math.random() * 1000000);

  const person = new Person({
    name: name,
    number: number,
    id: randomId,
  });

  person.save().then((result) => {
    console.log(`Added ${name} (number: ${number}) to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length > 5) {
  console.log(
    'Too many arguments, please use quotes when needed, e.g: node mongo.js <password> "John Snow" 0512321432'
  );
  process.exit(1);
}
