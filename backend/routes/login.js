const express = require("express");

// Import doctors controllers
const { login } = require("../controllers/Login");

// Create login router .
const loginRouter = express.Router();

loginRouter.get("/", login);

module.exports = loginRouter;
