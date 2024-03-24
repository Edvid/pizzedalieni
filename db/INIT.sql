CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  price MONEY,
  image VARCHAR
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE pizza_ingredients (
  pizza_id INT REFERENCES pizzas(id),
  ingredient_id INT REFERENCES ingredients(id),
  PRIMARY KEY (pizza_id, ingredient_id)
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(80),
  last_name VARCHAR(80),
  email VARCHAR(254) UNIQUE,
  password CHAR(60)
);

CREATE TABLE addables (
  id SERIAL PRIMARY KEY,
  pizza_id INT,
  amount INT
);

CREATE TABLE account_addables (
  account_id INT REFERENCES accounts(id),
  addable_id INT REFERENCES addables(id),
  PRIMARY KEY (account_id, addable_id)
);

INSERT INTO pizzas (name, price, image) VALUES
   ('Proxima Centauri',  50, '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'),
   ('Area 51',  55,'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'),
   ('Aphelion',  50,'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'),
   ('Andromeda',  55,'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'),
   ('Galileo', 50, 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAYAAADvCdDvAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpaIVh1YQcchQnSyKijhqFYpQodQKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxdnBSdJES/5cUWsR4cNyPd/ced+8AoV5mqtkxDqiaZaTiMTGTXRUDr/AjhB70Y0xipj6XTCbgOb7u4ePrXZRneZ/7c/QqOZMBPpF4lumGRbxBPL1p6Zz3icOsKCnE58SjBl2Q+JHrsstvnAsOCzwzbKRT88RhYrHQxnIbs6KhEk8RRxRVo3wh47LCeYuzWq6y5j35C4M5bWWZ6zSHEMcilpCECBlVlFCGhSitGikmUrQf8/APOv4kuWRylcDIsYAKVEiOH/wPfndr5icn3KRgDOh8se2PYSCwCzRqtv19bNuNE8D/DFxpLX+lDsx8kl5raZEjoG8buLhuafIecLkDDDzpkiE5kp+mkM8D72f0TVkgdAt0r7m9Nfdx+gCkqavEDXBwCIwUKHvd491d7b39e6bZ3w9wbHKmoNoQcQAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+gDEwsoHHbGrOoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAF8ElEQVR42u2c70scRxjHv3O38eqexmpFTQ2HUNKXQsB/QN8VkRgKbaQ0ubyQEENMgv1BC1KCNKAg1gYupHnRJi2YFEqFcu078w/0lS9bCiI0NocxiWdydzvjTV+sc+xdzru9vb3d1TyfN+rc7ro3H59n5pnbESAIgiAIgiAIgiAIgiAIgiAIgjjcsMP0Zv765bJ0eu67799kJMSnzm8EbgllJCFYchhJKCakH0P+5YZvchiJKBZhFVIqp9wxbkvRDqOExPS9mo6fmDnb8PdlVwo76CJq7fxK9A2NYm1lufDV2rbf67XItCNFO4giGiGhWnvf0Cg6YzGslRz3+8Nt23LsRAo7KCLclFCp8/uGRgvtayvLGIhPYnN9/ZVzVKSo72tJgZWksNdZRKV0NRCfxJ8/fFv0sxJTSUa9YtjrKKE0ClQ6UgJU++e/PSw6b3ZksOjcakKcSGFBkuFVNJSTY42OUhGlPFhYLDq+WrRUkuKJkKCKKP3rBoDOWKwoFVWTYY2WgfgkAGBzfb2uSLFKYX7K8CMiqmFXyH6R4nRMUVIYiUBhwP7w2pWaznuwsFiIMDUGOS1ClZCQlzIS0/cCJaNvaBR9Q6O2OrIcayvLhXRn9xrV3r/mhYwgpibreFJubLF7jc5YzJTj0n1pjZSxn4ixZL8rN780vOr4XJXrrfWGE9SAbnc6XG0arPkh48KFqwCArrYwUs93AQAnepsKx/z9r1H195/obcInybkiKVbRdmSpdKU6c3ZksKZBXYkot8xSbYDfj5DbMiqNE2PJflwcv4JQXiIsJWbm5hHKS4TyEttpge20QDotEJZmWzgvEcrnEc7n0XM0tNeWR/fREEJSYv76pwUJSrSS7SRaakEViZ2x2Cvnr60sO7qmIyHVZOzHWLIfn318ETE9D93gSHy3iKlzE7h1ZxHHoxIRQyDCBXYeZ9GrS+gGR3OO43gUaM4J7KSyiBocvVEgYghktnJ49M8LTJ2dwFiyH9fil3Bcl7h9+xvb0WHttHdOnkTf0ChmRwZtza5UVG2urxciwinWOiTkhQyVQuZ+vIXsRhatGY7pM+OYv5vA9JlxRLhARHA0cQE9J5DdyEDPCegGR3YjC90Q0LMcPS0SEc4RERzZxxmz3eAAgJaMAWMj47hTnj95UkhBlaRYX1PRYTci7CzVMzeE1DKLGkv2Y/ZUHK1dYaRTu4j2HIF5UYl0Spi3JIGj3Rq2UxyQDIwBLV1hMDBIAOkUR2uXhp3ULr749XssDa9iLNmPG6fPAwC+3GtzuoSi6pLSccFa2Zf7vMTTSt0NGVYpN9/7CJAS0bebsLt3Gy/+40V/KeoXRnuOFNrNYyTAGK4mf6prUC+XwsqlntIFyFJh9az8lq5l+fIB1dLwKi7/4f60141psFVAIS2p1/fa1MxMSdxPZC2pypUICWLB50bBWJqqavnZaaryNULspDS/Csdq40G5Ka5bMmwL8fKRnCAVjk5rlHqeYgkFLTKCWDi6LaPuz9S9GD9U4djeoWHz2S7m7yYwdW4C83cT+PrqpDnlYsDWlkBHh4atpwKQML/fEgAz30x7u1aYnm09FQCA+XsJXItfQke7humFxboG/3qjotpTJ1o9N+CmlKXhVcwlb+GrD8bRCpiF432zcGx7SwCQkGB7hSOHzsyJcXZDQGcApERbpwZwvlfoCeiWyXNLxoCR5YEVEciUtTS8ius/30FzjuNYax6zp+LobgMiwqzO+aOXaDY4mnMC3W0SzTlzeUXPcXS9KfGGEIgIAeNRBl1tEnqOY+b+HSwNr2LmgXndG6fPuzZpcFtGXSmrkVPfIBaOjRbhWqXeSCl+THvdmjk53ZLgylrWYS0SvRThupDDJMZJHeHbDqpaHmg4zAIaIcORkFor9yCKcWs/SCM2itZ1waA/KtqIjTiN3q1b98XdWOdyQ1Sjd0F5tW3alycXDwp+7F339dleEuCBkIMkJij/vcETIUGSE8SO91WIl6IOUucTBEEQBEEQBEEQBEEQBEEQBEEQBEEQgeZ/8FLarPQBxeEAAAAASUVORK5CYII=');

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

CREATE PROCEDURE sign_up(firn VARCHAR, lasn VARCHAR, em VARCHAR, pw CHAR)
LANGUAGE SQL
AS
$$
  INSERT INTO accounts (
    first_name,
    last_name,
    email,
    password
  ) VALUES (
    firn,
    lasn,
    LOWER(em),
    pw
  )
$$;

CREATE FUNCTION get_user_via_email(em VARCHAR)
RETURNS setof accounts
AS
$$
  SELECT * from accounts
  WHERE LOWER(email)=em
  LIMIT 1
$$
LANGUAGE SQL;

CREATE FUNCTION user_addedinbasket_get(userid int)
RETURNS TABLE (id INT, name VARCHAR(50), price MONEY, amount INT)
LANGUAGE SQL
AS
$$
  SELECT pizzas.id as id, name, price, amount
  FROM account_addables
  INNER JOIN addables
  ON account_addables.addable_id=addables.id
  INNER JOIN pizzas
  ON addables.id=pizzas.id
  WHERE account_addables.account_id=userid
$$;

