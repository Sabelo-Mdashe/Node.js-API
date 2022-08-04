// Forget Password Route

const nodemailer = require("nodemailer");
const con = require("../../lib/db-connection");
const router = require("../../routes/userRoutes");
const bcrypt = require("bcryptjs");

router.post("/fogort-password", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };

    con.query(sql, user, (err, result) => {
      if (err) throw err;
      if (result === 0) {
        res.status(400).send("Email not found");
      } else {
        // Connect to the email
        const transporter = nodemailer.createTransport({
          host: process.env.MAILERHOST,
          port: process.env.MAILERPORT,
          auth: {
            user: process.env.MAILERUSER,
            pass: process.env.MAILERPASS,
          },
        });

        // Sending the mail
        let mailData = {
          from: proccess.env.MAILERUSER,
          // sending to the person who requested
          to: result[0].email,

          subject: "Password Reset",
          html: `<div>
          <h3>Hello ${result[0].full_name},</h3>
          <br />
          <h4>Click the link below to reset your password<h4/>

          <a href="https://user-images.githubusercontent.com/4998145/52377595-605e4400-2a33-11e9-80f1-c9f61b163c6a.png">
          Click Here to Reset Password
          user_id = ${result[0].user_id}
        </a>
        <br />
        </div>`,
        };

        // Checking if the email can be sent
        // Checking the .env file for email and password

        transporter.verify((error, success) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email valid", success);
          }
        });

        transporter.sendMail(mailData, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            res.send("Please check your email", result[0].user_id);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// Reset Password Route

router.put("/fogort-password", (req, res) => {
  let sql = "SELECT * FROM users WHERE ?";
  let user = {
    user_id: req.params.id,
  };
  con.query(sql, user, (err, result) => {
    if (err) throw err;
    if (result === 0) {
      res.status(400).send("User not found");
    } else {
      let new_password = `UPDATE users SET ? WHERE user_id = ${req.params.id}`;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const updated_password = {
        full_name: result[0].full_name,
        email: result[0].email,
        user_type: result[0].user_type,
        phone: result[0].phone,
        country: result[0].country,
        billing_address: result[0].billing_address,
        default_shipping_address: result[0].default_shipping_address,
        password: hash,
      };

      con.query(new_password, updated_password, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Password Updated please login");
      });
    }
  });
});
