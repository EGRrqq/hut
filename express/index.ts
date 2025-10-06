import cors from "cors"
import express from "express"
import playerRouter from "./routes/playerRouter";

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

// routers
app.use('/api/v1/players', playerRouter)

app.listen(PORT, () => { console.log(`app runnin on port: ${PORT}`) })
