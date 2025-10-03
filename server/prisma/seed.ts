import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const player1 = prisma.player.upsert({
    where: { id: 2, nickname: "serega" },
    update: {},
    create: { id: 2, nickname: "serega", score: 25 },
  });

  const player2 = prisma.player.upsert({
    where: { id: 128 },
    update: {},
    create: { id: 128, nickname: "pablo", score: 10 },
  });

  const player3 = prisma.player.upsert({
    where: { id: 112 },
    update: {},
    create: { id: 112, nickname: "buldozer", score: 1 },
  });

  console.log({ player1, player2, player3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
