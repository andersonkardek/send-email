-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_surveys_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "value" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "surveys_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "surveys_users_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_surveys_users" ("created_at", "id", "survey_id", "user_id", "value") SELECT "created_at", "id", "survey_id", "user_id", "value" FROM "surveys_users";
DROP TABLE "surveys_users";
ALTER TABLE "new_surveys_users" RENAME TO "surveys_users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
