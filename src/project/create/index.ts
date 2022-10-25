import express from "express"
import prisma from "../../clients/prisma"
import authenticateToken from "../../helpers/middleWare/authenticateToken"

const router = express.Router();

router.post("/createProject", authenticateToken, async (req: any, res: any) =>{
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

export default router
