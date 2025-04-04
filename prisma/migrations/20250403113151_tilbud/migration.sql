/*
  Warnings:

  - Added the required column `tilbud` to the `Bolsche` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bolsche" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "navn" TEXT NOT NULL,
    "farve" TEXT NOT NULL,
    "vægt" INTEGER NOT NULL,
    "surhed" TEXT NOT NULL,
    "styrke" TEXT NOT NULL,
    "smag" TEXT NOT NULL,
    "omkostninger" INTEGER NOT NULL,
    "tilbud" BOOLEAN NOT NULL
);
INSERT INTO "new_Bolsche" ("farve", "id", "navn", "omkostninger", "smag", "styrke", "surhed", "vægt") SELECT "farve", "id", "navn", "omkostninger", "smag", "styrke", "surhed", "vægt" FROM "Bolsche";
DROP TABLE "Bolsche";
ALTER TABLE "new_Bolsche" RENAME TO "Bolsche";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
