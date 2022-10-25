import express from "express"
import prisma from "../clients/prisma"
import createRouter from "./create"
import authenticateToken from "../helpers/middleWare/authenticateToken"
const router = express.Router()

router.get('/list', authenticateToken, async (req: any, res: any) => {
  const projects = await prisma.project.findMany();
  res.json(projects.filter((project: any) => project.author == req.user.name))
})

router.use('/create', createRouter)

export default router;
