CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  image BYTEA
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE pizza_ingredients (
  pizza_id int REFERENCES pizzas(id),
  ingredient_id int REFERENCES ingredients(id),
  CONSTRAINT PK PRIMARY KEY (pizza_id, ingredient_id)
);

INSERT INTO pizzas (name) VALUES
   ('Proxima Centauri'),
   ('Area 51'),
   ('Aphelion'),
   ('Andromeda'),
   ('Galileo');

INSERT INTO ingredients (name) VALUES
   ('tomato sauce'),
   ('cheese'),
   ('basilite'),
   ('pepperoni'),
   ('gorgonsolar'),
   ('anti-chovies'),
   ('Procyon calamari'),
   ('ham'),
   ('mushrooms'),
   ('astroid belt pepper'),
   ('onion'),
   ('bacon'),
   ('gloogorx cheese'),
   ('Saturnian salmon');

INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES
  (1, 1),
  (1, 2),
  (1, 5),
  (1, 10),
  (1, 11),
  (1, 12),
  (1, 13),

  (2, 1),
  (2, 2),
  (2, 5),
  (2, 7),

  (3, 1),
  (3, 2),
  (3, 4),
  (3, 5),
  (3, 6),
  (3, 9),
  (3, 12),

  (4, 1),
  (4, 2),
  (4, 9),
  (4, 10),
  (4, 14),

  (5, 1),
  (5, 2),
  (5, 5),
  (5, 6),
  (5, 9);

CREATE FUNCTION pizza_get_list()
RETURNS setof pizzas
AS
$$
  SELECT * FROM pizzas;
$$
LANGUAGE SQL;

CREATE FUNCTION pizza_get_list_with_ingredients()
RETURNS TABLE (pizza VARCHAR(50), ingredientname VARCHAR(50))
AS
$$
  SELECT p.id AS pizza, i.name AS ingredientname
  FROM pizzas AS p
  INNER JOIN pizza_ingredients AS pi
  ON p.id=pi.pizza_id 
  INNER JOIN ingredients AS i ON pi.ingredient_id=i.id;
$$
LANGUAGE SQL;

