const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 3;
const bodyParser = require('body-parser');

const pgp = require('pg-promise')();
const databaseConfig = {
  host: 'db',
  port: 5432,
  database: 'pizze_dalieni',
  user: 'postgres',
  password: process.env.PASSWORD, // keep your password secret!
};
const db = pgp(databaseConfig); // use pg-promise's connection function to create the connection object
const app = express();
const port = 3001;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false});

function dbErrorTranslator(str) {
  const matchobj = [
    {
      regex: /Key \(email\)=\((.*?)\) already exists\./gi,
      message: (m) => `A user is already signed up with the email ${m[1]}.`
    }
  ];

  for (var i = 0; i < matchobj.length; i++){
    const regex = matchobj[i].regex;
    const message = matchobj[i].message;
    var matcher = regex.exec(str);

    if (matcher !== null) {
      return message(matcher);
    }
  }

  return str + "\n\nContact support.";
}

async function createHash(password) {
  return await bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      console.log('Hash: ', hash)
      return hash;
    })
    .catch(err => console.error(err.message))
}

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

  await db.many(`select * from pizza_get_list();`)
  .then(data => data.forEach(e => {
    retval[e.id] = e;
  }));

  await db.many(`select * from pizza_get_list_with_ingredients();`)
  .then(data => data.forEach((dat) => {
    const [p, i] = [dat.pizza, dat.ingredientname];
    if (retval[p].ingredients == undefined)
      retval[p].ingredients = [];
    retval[p].ingredients.push(i);
  }));

  response.send(retval.filter((item) => item != null));
});

app.post('/signup', jsonParser, async (request, response) => {
  let logs = [];

  function pushtologs(condition, message, kind) {
    if(condition) {
      logs.push({ msg: message, kind: kind ? kind : "warning" });
    }
  }

  const body = request.body;

  pushtologs(body.firstName === '', "First name is a required field");
  pushtologs(body.lastName === '', "Last name is a required field");
  pushtologs(body.email === '', "Email is a required field");
  pushtologs(body.password === '', "Password is a required field");

  pushtologs(body.firstName.length > 80, "First name is not allowed to be longer than 80 characters");
  pushtologs(body.lastName > 80, "Last name is not allowed to be longer than 80 characters");
  pushtologs(body.email > 254, "Email is not allowed to be longer than 254 characters");

  pushtologs(body.password !== body.repeatPassword, "Passwords do not match");
  pushtologs(body.password.length < 8, "Passwords must be at least 8 characters");
  pushtologs(body.password == body.password.toLowerCase(), "Password must have at least one upper case letter");
  pushtologs(body.password == body.password.toUpperCase(), "Password must have at least one lower case letter");
  pushtologs(!body.password.match(/\d/g), "Password must contain a number");

  if (!~logs.map(log => log.kind).indexOf("warning")) {
    const hashedpw = await createHash(body.password);

    try {
      await db.none('call sign_up(${firn}::varchar, ${lasn}::varchar, ${em}::varchar, ${pw}::char)', {
        firn: body.firstName,
        lasn: body.lastName,
        em: body.email,
        pw: hashedpw
      });
      pushtologs(true, "You succesfully signed up! Log in.", "ok");
    } catch (e) {
      const resp = dbErrorTranslator(e.detail);
      console.log(resp)
      pushtologs(true, resp, e.severity.toLowerCase());
    }

  }

  response.send({logs: logs});
})

app.post('/login', (request, response) => {
  response.send({logs: [{ msg: "login WIP", kind: "error"}]});
})

app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
