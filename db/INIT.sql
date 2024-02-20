CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name NOT NULL UNIQUE VARCHAR(50),
  image BYTEA
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name NOT NULL UNIQUE VARCHAR(50)
);

CREATE TABLE pizza_ingredients (
  pizza_id FOREIGN KEY REFERENCES (pizzas.id),
  ingredients_id FOREIGN KEY REFERENCES (ingredients.id),
  NOT NULL UNIQUE PRIMARY KEY (pizza_id, ingredients_id)
);

INSERT INTO pizzas (name) VALUES (
   'Proxima Centauri'
   'Area 51'
   'Aphelion'
   'Andromeda'
   'Galileo'
);

INSERT INTO ingredients (name) VALUES (
   'tomato sauce'
   'cheese'
   'basilite'
   'pepperoni'
   'gorgonsolar'
   'anti-chovies'
   'Procyon calamari'
   'ham'
   'mushrooms'
   'astroid belt pepper'
   'onion'
   'bacon'
   'gloogorx cheese'
   'Saturnian salmon'
);

INSERT INTO pizza_ingredients (pizza_id, ingredients_id) VALUES (
  1, 1,
  1, 2,
  1, 5,
  1, 10,
  1, 11,
  1, 12,
  1, 13,

  2, 1,
  2, 2,
  2, 5,
  2, 7,

  3, 1,
  3, 2,
  3, 4,
  3, 5,
  3, 6,
  3, 9,
  3, 12,

  4, 1,
  4, 2,
  4, 9,
  4, 10,
  4, 14,

  5, 1,
  5, 2,
  5, 5,
  5, 6,
  5, 9,
);
