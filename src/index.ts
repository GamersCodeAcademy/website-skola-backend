// import some modules that are required for the application
import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser"
import cors from "cors"

// initiate express
const app = express();

// create a prisma client
const prisma = new PrismaClient();

// the entrt point
const main = async () => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())

  app.get("/", (req, res) => {
    res.end("Hello")
  });

  app.post("/createProject", async (req, res) =>{
    console.log(req.body)
    const project = await prisma.project.create({
      data: {
	title: req.body.title,
	description: req.body.desc,
	repo: req.body.repo,
	author: req.body.author
      }
    })
    res.end("Success")
  })

  app.post("/signup", async (req, res) =>{
    console.log(req.body)
    const User = await prisma.user.findFirst({
      where: {
	email: req.body.email
      }
    })
    if(User !== null){
      res.end("Nope");
    }else{
      const user = await prisma.user.create({
	data: {
	  username: req.body.username,
	  email: req.body.email,
	  password: req.body.password
	}
      })
      res.end("Success")
    }
  })

  app.post("/login", async (req, res) =>{
    console.log(req.body)
    const user = await prisma.user.findFirst({
      where: {
	username: req.body.username,
	password: req.body.password
      }}
    )
    if(user !== null){
      res.end("Success");
    }else{
      res.end("Nope");
    };
  })

  app.listen(3001)
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
