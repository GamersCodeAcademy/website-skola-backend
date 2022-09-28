// import some modules that are required for the application
import express from "express";

// initiate express
const app = express();

// the entrt point
const main = async() => {
  app.get("/", (req, res) => {
    res.end("Hello")
  });

  app.listen(3001)
}

main();
