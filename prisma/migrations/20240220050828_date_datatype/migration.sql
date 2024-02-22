-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "transactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isPatnerTransaction" BOOLEAN NOT NULL,
    "patnerId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tds" INTEGER NOT NULL DEFAULT 10,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_patnerId_fkey" FOREIGN KEY ("patnerId") REFERENCES "Patner" ("patnerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "createdAt", "date", "description", "isPatnerTransaction", "patnerId", "tds", "transactionId", "transactionType", "updatedAt") SELECT "accountId", "amount", "createdAt", "date", "description", "isPatnerTransaction", "patnerId", "tds", "transactionId", "transactionType", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
