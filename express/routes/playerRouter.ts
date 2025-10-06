import express from "express"
import prisma from "@/prisma"

const playerRouter = express.Router()

playerRouter.get('/', async (_, res) => {
    try {
        const players = await prisma.player.findMany()
        res.status(200).json(players)
    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "error while fetching players",
            error
        })
    }
})

export default playerRouter