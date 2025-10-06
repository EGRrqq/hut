import cors from "cors"
import express from "express"

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.get('/api/v1/players', (req, res) => {
    const players = [{ name: "serega", score: 52 }, { name: "vitaly", score: 15 }, { bruh: "qwr", cruh: 32465 }]
    res.status(200).json(players)
})

app.listen(PORT, () => { console.log(`app runnin on port: ${PORT}`) })
