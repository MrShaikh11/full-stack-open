const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

morgan.token("print", function (req, res) {
  return JSON.stringify(req.body) || "No Body";
});
app.use(cors());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :print")
);

app.use(express.json());

let data = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const now = new Date();
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = data.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${data.length}</p>
    <p>${now}</p>
    `);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((per) => per.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(404).json({ error: "content missin" });
  }
  const id = (Math.floor(Math.random() * 1000) + 1).toString();
  const check = data.find((p) => p.name === person.name);
  if (check) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const contact = {
    id: id,
    name: person.name,
    number: person.number,
  };
  // console.log(data);
  data = [...data, contact];
  // console.log(data);
  response.json(contact);
});

PORT = 3001;

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
