const express = require('express');
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

app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
