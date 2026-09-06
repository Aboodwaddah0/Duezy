-- Add the external user identity separately from the generated profile ID.
ALTER TABLE "profiles" ADD COLUMN "userId" TEXT;

UPDATE "profiles" SET "userId" = "id" WHERE "userId" IS NULL;

ALTER TABLE "profiles" ALTER COLUMN "userId" SET NOT NULL;
ALTER TABLE "profiles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");