// import some modules that are required for the application
import express from "express";
import prisma from "./clients/prisma"
import bodyParser from "body-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import config from "../config.json"
import projectRouter from "./project"

// initiate express
const app = express();

// the entrt point
const main = async () => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use('/project', projectRouter)

  app.listen(3001);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect();
    process.exit(1);
  });
