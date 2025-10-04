import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const player1 = prisma.player.upsert({
    where: { id: "523", nickname: "serega" },
    update: {},
    create: { id: "523", nickname: "serega" },
  });

  const player2 = prisma.player.upsert({
    where: { id: "623" },
    update: {},
    create: { id: "623", nickname: "pablo" },
  });

  const player3 = prisma.player.upsert({
    where: { id: "qte23" },
    update: {},
    create: { id: "qte23", nickname: "buldozer" },
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
