-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
