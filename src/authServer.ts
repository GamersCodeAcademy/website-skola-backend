// import some modules that are required for the application
import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import config from "../config.json"

// initiate express
const app = express();

// create a prisma client
const prisma = new PrismaClient();

const generateAccessToken = (user: any) => {
  return jwt.sign(user, config.jwt.accessTokenSecret, { expiresIn: '30s'})
}

// the entrt point
const main = async () => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())

  app.get("/", (req: any, res: any) => {
    res.end("Hello")
  });

  app.delete("/logout", async (req: any, res: any) => {
    await prisma.refreshtokens.delete({
      where: {
	refreshToken: req.body.token
      }
    })
    res.sendStatus(204)
  })

  app.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    const isValid = await  prisma.refreshtokens.findFirst({
	where: {
	  refreshToken: refreshToken
	}
      }) == null ? false : true;
    if(isValid){
      jwt.verify(refreshToken, config.jwt.refreshTokenSecret, (err: any, user: any) => {
	if(err) return res.sendStatus(403)
	const accessToken = generateAccessToken({ name: user.name, email: user.email, id: user.id })
	res.json({accessToken: accessToken});
      })
    }else return res.sendStatus(403)
  })

  app.post("/signup", async (req: any, res: any) =>{
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

  app.post("/login", async (req: any, res: any) =>{
    // login
    const user = await prisma.user.findFirst({
      where: {
	username: req.body.username,
	password: req.body.password
      }
    });
    console.log(user)
    if(user !== null){
      const userObj = {name: user.username, enail: user.email, id: user.id}
      const accessToken = generateAccessToken(userObj);
      const refreshToken = jwt.sign(userObj, config.jwt.refreshTokenSecret);
      await prisma.refreshtokens.create({
	data: {
	  refreshToken: refreshToken
	}
      })
      console.log(accessToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });

    }
  })

  app.listen(config.server.auth.port);
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
