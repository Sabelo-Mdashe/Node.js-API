// Import express and cors

const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

// Configure the express server

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

// Create '/' (home) route

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(_dirname + "/" + "index.html");
});

// Set up app listening for API calls

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});

// Importing Route

const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const ordersRoute = require("./routes/ordersRoutes");

// Using Route

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/orders", ordersRoute);
