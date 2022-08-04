const express = require("express");
const app = express();
const fs = require("fs");
const con = require("../lib/db-connection");

const bodyParser = require("body-parser");
const router = require("../routes/categoryRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
