const middleware = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const con = require("../lib/db-connection");

// Addding A Product

router.post("/", middleware, (req, res) => {
  const {
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    create_date,
    stock,
  } = req.body;
  if (req.user.user_type === "admin") {
    try {
      let sql = "INSERT INTO products SET ?";
      let product = {
        sku,
        name,
        price,
        weight,
        descriptions,
        thumbnail,
        image,
        category,
        create_date,
        stock,
      };

      con.query(sql, product, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send("Access Denied");
  }
});

// Editing A Product

router.put("/:id", middleware, (req, res) => {
  const {
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    create_date,
    stock,
  } = req.body;
  if (req.user.user_type === "admin") {
    try {
      con.query(
        `UPDATE products SET sku='${sku}', name='${name}', price='${price}', weight='${weight}', descriptions='${descriptions}', thumbnail='${thumbnail}', image='${image}', category='${category}', create_date='${create_date}', stock='${stock}' WHERE product_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.status(401).send("Access Denied");
  }
});

// Deleting A Product

router.delete("/:id", middleware, (req, res) => {
  if (user_type === "admin") {
    try {
      con.query(
        `DELETE FROM products WHERE product_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.status(401).send("Access Denied");
  }
});

// Adding A Category

router.post("/", middleware, (req, res) => {
  const { name, description, thumbnail } = req.body;
  if (user_type === "admin") {
    try {
      con.query(
        `INSERT INTO categories (name,description,thumbnail) VALUES ('${name}','${description}','${thumbnail}')`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.status(401).send("Access Denied!");
  }
});

// Editing A Category

router.put("/:id", middleware, (req, res) => {
  const { name, description, thumbnail } = req.body;
  if (user_type === "admin") {
    try {
      con.query(
        `UPDATE categories SET name='${name}', descriptions='${description}', thumbnail='${thumbnail}' WHERE category_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.status(401).send("Access Denied!");
  }
});

// Deleting A Category

router.delete("/:id", middleware, (req, res) => {
  if (user_type === "admin") {
    try {
      con.query(
        `DELETE FROM category WHERE category_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.status(401).send("Access Denied!");
  }
});

module.exports = router;
