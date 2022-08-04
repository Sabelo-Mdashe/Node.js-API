const express = require("express");
const router = express.Router();
const con = require("../lib/db-connection");
const bcrypt = require("bcryptjs");
const { request } = require("express");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

// Getting All Users

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Getting A Single User

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM users WHERE user_id = ${req.params.id}`,
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

// Adding A User

router.post("/", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;
  try {
    con.query(
      `INSERT INTO users (email,password,full_name,billing_address,default_shipping_address,country,phone,user_type) VALUES ('${email}','${password}','${full_name}','${billing_address}','${default_shipping_address}','${country}','${phone}','${user_type}')`,
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

// Editing A User

router.put("/:id", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;

  try {
    con.query(
      `UPDATE users SET email='${email}', password='${password}', full_name='${full_name}', billing_address='${billing_address}', default_shipping_address='${default_shipping_address}', country='${country}', phone='${phone}', user_type='${user_type}' WHERE user_id = ${req.params.id}`,
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

// Deleting A User

router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users WHERE user_id = ${req.params.id}`,
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

module.exports = router;

// Password Encryption

// Register Route

router.post("/register", (req, res) => {
  const {
    full_name,
    email,
    password,
    user_type,
    phone,
    country,
    billing_address,
    default_shipping_address,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    con.query(
      `INSERT INTO users (full_name,email,password,user_type,phone,country,billing_address,default_shipping_address) VALUES ('${full_name}','${email}','${hash}','${user_type}','${phone}','${country}','${billing_address}','${default_shipping_address}')`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`User ${(full_name, email)} created successfully`);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Login Route

router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        // Decryption
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        // If password !== (does not match)
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          // res.send(result);

          // The information should be stored inside the token
          const payload = {
            user: {
              user_id: result[0].user_id,
              full_name: result[0].full_name,
              email: result[0].email,
              user_type: result[0].user_type,
              phone: result[0].phone,
              country: result[0].country,
              billing_address: result[0].billing_address,
              default_shipping_address: result[0].default_shipping_address,
            },
          };

          // Creating a token and setting an expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Verify Route

router.get("/users/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({ msg: "Unauthorised Access!" });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});

router.get("/", middleware, (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
