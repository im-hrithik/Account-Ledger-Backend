/*
  Warnings:

  - Added the required column `updatedAt` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Patner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Account" (
    "accountId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isPatnerTransaction" BOOLEAN NOT NULL,
    "patnerId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "tds" INTEGER NOT NULL DEFAULT 10,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_patnerId_fkey" FOREIGN KEY ("patnerId") REFERENCES "Patner" ("patnerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "companyId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("companyId", "companyName") SELECT "companyId", "companyName" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE TABLE "new_Patner" (
    "patnerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Patner_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("companyId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patner" ("companyId", "email", "firstName", "lastName", "password", "patnerId") SELECT "companyId", "email", "firstName", "lastName", "password", "patnerId" FROM "Patner";
DROP TABLE "Patner";
ALTER TABLE "new_Patner" RENAME TO "Patner";
CREATE UNIQUE INDEX "Patner_email_key" ON "Patner"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_key" ON "Account"("account");
