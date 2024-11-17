/*
  Warnings:

  - You are about to drop the column `monthlyPaymentValue` on the `Student` table. All the data in the column will be lost.
  - Added the required column `categorie` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turn` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategorieType" AS ENUM ('PARCIAL', 'INTEGRAL');

-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('BERCARIO', 'CRECHE', 'ESCOLA', 'REFORCO');

-- CreateEnum
CREATE TYPE "TurnType" AS ENUM ('MATUTINO', 'VESPERTINO');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "monthlyPaymentValue",
ADD COLUMN     "categorie" "CategorieType" NOT NULL,
ADD COLUMN     "class" "ClassType" NOT NULL,
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "disabledAt" TIMESTAMP(3),
ADD COLUMN     "turn" "TurnType" NOT NULL;
