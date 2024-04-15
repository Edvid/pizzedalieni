const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 3;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const pgp = require('pg-promise')();
const cors = require('cors');

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

app.use(cors({
  origin: ['https://*.pizzedalieni.com'],
  credentials: true,
  methods: ['GET', 'POST'],
  "optionsSuccessStatus": 204
}));

const jsonParser = bodyParser.json();

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

function verifyProxy(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError' && error.message === 'jwt expired' && error.expiredAt){
      return { err: true }
    }
  }
}

async function validateUser(email, password) {

  var responses = {
    dbfail: {
      msg: `Couldn't find a user on our system with email:
${email}

Did you type the email correctly?
Did you use the correct email?`,
      kind: "warning"
    },
    bcryptfail: {
      msg: "something went wrong when comparing your password to our database. Try again later.",
      kind: "warning"
    },
    nomatch: {
      msg: "The password you typed was not correct for this user",
      kind: "warning"
    },
    login: {
      msg: "Login succesful",
      kind: "ok"
    }
  }

  var hash = await
  db.oneOrNone('select password from get_user_via_email(${em}::varchar)', {
    em: email
  }).then(res => res ? res.password : null);

  if (hash === null) {
    return responses.dbfail;
  }

  var message = {};
  await bcrypt
  .compare(password, hash)
  .then(res => {
    if (res) {
      message = responses.login;
    }
    else {
      message = responses.nomatch;
    }
  })
  .catch(err => { console.error(err.message), message = responses.bcryptfail})

  return message;
}

let sco;
db.connect()

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

  const { firstname, lastname, email, password, repeatpassword } = request.body;

  pushtologs(firstname === '', "First name is a required field");
  pushtologs(lastname === '', "Last name is a required field");
  pushtologs(email === '', "Email is a required field");
  pushtologs(password === '', "Password is a required field");

  pushtologs(firstname.length > 80, "First name is not allowed to be longer than 80 characters");
  pushtologs(lastname > 80, "Last name is not allowed to be longer than 80 characters");
  pushtologs(email > 254, "Email is not allowed to be longer than 254 characters");

  pushtologs(password !== repeatpassword, "Passwords do not match");
  pushtologs(password.length < 8, "Passwords must be at least 8 characters");
  pushtologs(password == password.toLowerCase(), "Password must have at least one upper case letter");
  pushtologs(password == password.toUpperCase(), "Password must have at least one lower case letter");
  pushtologs(!password.match(/\d/g), "Password must contain a number");

  if (!~logs.map(log => log.kind).indexOf("warning")) {
    const hashedpw = await createHash(password);

    try {
      await db.none('call sign_up(${firn}::varchar(80), ${lasn}::varchar(80), ${em}::varchar(254), ${pw}::char(60))', {
        firn: firstname,
        lasn: lastname,
        em: email,
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

app.post('/login', jsonParser, async (request, response) => {
  const { email, password } = request.body;

  var validateUserLog = await validateUser(email, password);

  if(validateUserLog.kind === 'ok'){
    var user = await
      db.oneOrNone('select * from get_user_via_email(${em}::varchar)', {
        em: email
      });
    const token = jwt.sign(
      {userID: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
      }
    );

    await db.none("call update_last_login(${userid})", {
      userid: user.id,
    });

    response.send({logs: [validateUserLog], token: token, userInfo: { firstname: user.first_name }});
  }else {
    response.send({logs: [validateUserLog]});
  }
})

app.post('/logout', jsonParser, async (request, response) => {
  const { token } = request.body;

  // don't need the decoded token in logout at all yet
  // but might if I implement database stored session management.
  // For now, you're always allowed to log out of client, regardless
  // of credentials
  const decodedToken = jwt.decode(token);
  response.send({logs: [{msg: "logout permitted", kind: "ok"}]});
})

app.post('/userbasket/set', jsonParser, async (request, response) => {
  const { token } = request.headers;
  const { basketContent } = request.body;
  const { userID, err } = verifyProxy(token);
  if (err) return;
  await db.none("call user_addedinbasket_clear(${userid})", {
    userid: userID,
  });
  // I don't think stored procedures can handle arrays
  // Handle this with a loop
  basketContent.forEach(item => {
    db.none("call user_addedinbasket_set(${userid}, ${pizzaid}, ${pizzaamount})", {
      userid: userID,
      pizzaid: item.itemId,
      pizzaamount: item.amount
    });
  });
  await db.none("call update_last_login(${userid})", {
    userid: userID,
  });
})


app.get('/userbasket/get', async (request, response) => {
  const { token } = request.headers;
  const { userID, err } = verifyProxy(token)
  if (err) {
    response.send({error: "token expired" });
    return;
  }
  let pizzas = [];

  await db.manyOrNone("select * from user_addedinbasket_get(${userid})", {
    userid: userID
  })
  .then(data => data.forEach(e => {
    const pizza = {
      itemId: e.id,
      name: e.name,
      price: e.price,
      amount: e.amount
    }
    pizzas.push(pizza);
  }));

  await db.none("call update_last_login(${userid})", {
    userid: userID,
  });

  response.send({pizzas: pizzas});
});
app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
