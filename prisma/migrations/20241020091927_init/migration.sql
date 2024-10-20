-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "details" VARCHAR(2000) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
