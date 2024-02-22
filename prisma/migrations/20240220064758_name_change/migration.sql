/*
  Warnings:

  - You are about to drop the `Patner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isPatnerTransaction` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `patnerId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `isPartnerTransaction` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partnerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Patner_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Patner";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Partner" (
    "partnerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Partner_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("companyId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "transactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isPartnerTransaction" BOOLEAN NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tds" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner" ("partnerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "createdAt", "date", "description", "tds", "transactionId", "transactionType", "updatedAt") SELECT "accountId", "amount", "createdAt", "date", "description", "tds", "transactionId", "transactionType", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Partner_email_key" ON "Partner"("email");
