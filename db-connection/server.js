const express = require('express');
const bodyParser = require('body-parser');

const pgp = require('pg-promise')();
const databaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'pizze_dalieni',
  user: 'postgres',
  password: '', // keep your password secret!
};
const db = pgp(databaseConfig); // use pg-promise's connection function to create the connection object
const app = express();
const port = 3001;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false});

let sco;
db.connect()
  .then(obj => {
    sco = obj;
    return sco.any('SELECT * FROM Users');
  })
  .then(data => {
    
  })
  .catch(err => {
    
  })
  .finally(() => {
    if (sco) {
      sco.done();
    }
  })

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.get('/pizzas', async (request, response) => {
  let retval = [];

  await db.any(
  `
  SELECT * FROM pizzas
  `
  ).then(data => data.forEach(e => {
    retval[e.id] = e;
  }));

  await db.any(
  `
  SELECT p.id AS pizza, i.name AS ingredientname
  FROM pizzas AS p
  INNER JOIN pizza_ingredients AS pi
  ON p.id=pi.pizza_id 
  INNER JOIN ingredients AS i ON pi.ingredient_id=i.id
  `
  ).then(data => data.forEach((dat) => {
    const [p, i] = [dat.pizza, dat.ingredientname];
    if (retval[p].ingredients == undefined)
      retval[p].ingredients = [];
    retval[p].ingredients.push(i);
  }));

  response.send(retval.filter((item) => item != null));
});

app.post('/signup', jsonParser, (request, response) => {
  let messages = [];
  let kind = "error";

  const body = request.body;

  console.log(body);
  if(body.firstName === '') {
    messages.push("First name is a required field");
    kind = "warning";
  }
  if(body.lastName === '') {
    messages.push("Last name is a required field");
    kind = "warning";
  }
  if(body.email === '') {
    messages.push("Email is a required field");
    kind = "warning";
  }

  if(body.password === ''){
    messages.push("Password is a required field");
    kind = "warning";
  }
  else{
    if (body.password !== body.repeatPassword) {
      messages.push("Passwords do not match");
      kind = "warning";
    }
    if (body.password.length < 8) {
      messages.push("Passwords must be at least 8 characters");
      kind = "warning";
    }
    if (body.password == body.password.toLowerCase()) {
      messages.push("Password must have at least one upper case letter");
      kind = "warning";
    }
    if (body.password == body.password.toUpperCase()) {
      messages.push("Password must have at least one lower case letters, and a number");
      kind = "warning";
    }
    if (!body.password.match(/\d/g)) {
      messages.push("Password must contain a number");
      kind = "warning";
    }
  }

  if (messages.length == 0) {
    messages.push(`signup WIP, ${body.firstName}`);
    kind = "warning";
  }

  let message = messages.join(',\n');

  response.send({msg: message, kind: kind});
})

app.post('/login', (request, response) => {
  response.send({msg: "login WIP", kind: "warning"});
})

app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
