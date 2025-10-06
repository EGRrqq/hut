import cors from "cors"
import express from "express"
import prisma from "./prisma";

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.get('/api/v1/players', async (req, res) => {
    const players = await prisma.player.findMany()
    res.status(200).json(players)
})

app.listen(PORT, () => { console.log(`app runnin on port: ${PORT}`) })
