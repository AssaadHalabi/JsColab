-- CreateTable
CREATE TABLE "Notebook" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "User_id" INTEGER NOT NULL,
    "cells" JSON[],
    "name" VARCHAR(255),
    "created" DATE,
    "owner_email" VARCHAR(255),

    CONSTRAINT "Notebooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Email" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Notebook" ADD CONSTRAINT "notebooks_user_id_foreign" FOREIGN KEY ("User_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
