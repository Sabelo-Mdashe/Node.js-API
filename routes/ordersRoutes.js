const express = require("express");
const router = express.Router();
const con = require("../lib/db-connection");
const middleware = require("../middleware/auth");

// Getting All Orders

router.get("/", middleware, (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(result);
  }
});

// Getting A Single Order

router.get("/:id", middleware, (req, res) => {
  try {
    con.query(
      `SELECT * FROM orders WHERE order_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(result);
  }
});

// Adding An Order

router.post("/", middleware, (req, res) => {
  const {
    user_id,
    amount,
    shipping_address,
    order_email,
    order_date,
    order_status,
  } = req.body;
  try {
    con.query(
      `INSERT INTO orders (user_id,amount,shipping_address,order_email,order_date,order_status) VALUES ('${user_id}','${amount}','${shipping_address}','${order_email}','${order_date}','${order_status}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(result);
  }
});

// Editing An Order

router.put("/:id", middleware, (req, res) => {
  const { amount, shipping_address, order_email, order_date, order_status } =
    req.body;

  try {
    con.query(
      `UPDATE orders SET amount='${amount}', shipping_address='${shipping_address}', order_email='${order_email}', order_date='${order_date}', order_status='${order_status}' WHERE order_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Deleting A Order

router.delete("/:id", middleware, (req, res) => {
  try {
    con.query(
      `DELETE FROM orders WHERE order_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(result);
  }
});

module.exports = router;
