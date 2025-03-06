/*
  Warnings:

  - You are about to drop the column `ruleId` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `scenarioId` on the `Rule` table. All the data in the column will be lost.
  - Added the required column `scenarioId` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_ruleId_fkey";

-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_scenarioId_fkey";

-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "ruleId",
ADD COLUMN     "scenarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "scenarioId";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "metadata" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ScenarioRule" (
    "id" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ScenarioRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScenarioRule_scenarioId_ruleId_key" ON "ScenarioRule"("scenarioId", "ruleId");

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenarioRule" ADD CONSTRAINT "ScenarioRule_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenarioRule" ADD CONSTRAINT "ScenarioRule_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
