// import some modules that are required for the application
import express from "express";

// initiate express
const app = express();

// here it handles requests
const main = async() => {
    app.get("/", (req, res) => {
	res.end("Hello")
    });
}
main();
