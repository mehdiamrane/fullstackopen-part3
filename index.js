require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('data', (request) => {
  return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  var d = new Date();
  Person.find({}).then((result) => {
    res.send(`<p>Phonebook has info for ${result.length} people. <br/> ${d}</p>`);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  let persons = [];
  Person.find({}).then((result) => {
    persons = result;
  });

  // Not working yet
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  let persons = [];
  Person.find({}).then((result) => {
    persons = result;
  });

  // Not working yet
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const nameExists =
    persons.some((p) => p.name.toLowerCase() === body.name.toLowerCase()) >= 1 ? true : false;

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const randomId = Math.floor(Math.random() * 1000000);

  const person = {
    name: body.name,
    number: body.number,
    id: randomId,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
