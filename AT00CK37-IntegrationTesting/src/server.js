/**
 * @file Express server for math operations API.
 * @module server
 */

const express = require("express");
const mathlib = require("./math");
const app = express();
const port = 3000;

/**
 * Root route handler.
 * @name get/
 * @function
 * @inner
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get("/", (req, res) => res.send("Hello"));

/**
 * Add route handler.
 * Takes query parameters 'a' and 'b', adds them using mathlib, and returns the result.
 * @name get/add
 * @function
 * @inner
 * @param {import('express').Request} req - Express request object (expects query params a and b)
 * @param {import('express').Response} res - Express response object
 */
app.get("/add", (req, res) => {
	const a = parseInt(req.query.a, 10);
	const b = parseInt(req.query.b, 10);
	res.send(String(mathlib.add(a, b)));
});

/**
 * IsEven route handler.
 * Takes query parameter 'n', checks if it is even using mathlib, and returns the boolean result.
 * @name get/isEven
 * @function
 * @inner
 * @param {import('express').Request} req - Express request object (expects query param n)
 * @param {import('express').Response} res - Express response object
 */
app.get("/isEven", (req, res) => {
	const num = parseInt(req.query.num, 10);
	res.send(String(mathlib.isEven(num)));
});

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => console.log(`Server: localhost:${port}`));
}

module.exports = app;