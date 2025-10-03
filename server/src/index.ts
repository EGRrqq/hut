import { withAccelerate } from "@prisma/extension-accelerate";
import express from "express";
import { Prisma, PrismaClient } from "../prisma/generated/prisma/client";

const prisma = new PrismaClient().$extends(withAccelerate());
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hut-server");
});

app.get("/players", async (req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});

app.listen(port, () => {
  console.log(`hut-serve listening on port ${port}`);
});
