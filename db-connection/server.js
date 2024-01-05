const express = require('express');
const pgp = require('pg-promise')();
const cn = 'postgres://postgres:@localhost:5432/pizze_dalieni'
const db = pgp(cn);
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
  let ingredientmappings = await db.any(
  `
  SELECT p.id AS pizza, i.name AS ingredientname
  FROM pizzas AS p
  INNER JOIN pizza_ingredients AS pi
  ON p.id=pi.pizza_id 
  INNER JOIN ingredients AS i ON pi.ingredient_id=i.id
  `
  );
  let retval = [];

  await db.any(
  `
  SELECT * FROM pizzas
  `
  ).then(data => data.forEach(e => {
    retval[e.id] = e;
  }));

  ingredientmappings.forEach((mapping) => {
    const [p, i] = [mapping.pizza, mapping.ingredientname];
    if (retval[p].ingredients == undefined)
      retval[p].ingredients = [];
    retval[p].ingredients.push(i);
  });

  response.send(retval);
});

app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
