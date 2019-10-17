
------------------------------------------------------------
-- TABLE DEFINITIONS
------------------------------------------------------------

DROP TABLE IF EXISTS "mills";
CREATE TABLE "mills"
(
  "id"   SERIAL NOT NULL PRIMARY KEY,
  "name" VARCHAR
);

DROP TABLE IF EXISTS "harvests";
CREATE TABLE "harvests"
(
  "id"        SERIAL NOT NULL PRIMARY KEY
  "startDate" DATE,
  "endDate"   DATE,
  "millId"    INTEGER
);

DROP TABLE IF EXISTS "farms";
CREATE TABLE "farms"
(
  "id"        SERIAL NOT NULL PRIMARY KEY
  "name"      VARCHAR,
  "harvestId" INTEGER
);

DROP TABLE IF EXISTS "fields";
CREATE TABLE "fields"
(
  "id"        SERIAL NOT NULL PRIMARY KEY
  "latitude"  FLOAT,
  "longitude" FLOAT,
  "farmId"    INTEGER
);

------------------------------------------------------------
-- FOREIGNS KEYS
------------------------------------------------------------

ALTER TABLE "harvests" ADD FOREIGN KEY ("millId") REFERENCES "mills" ("id");

ALTER TABLE "farms" ADD FOREIGN KEY ("harvestId") REFERENCES "harvests" ("id");

ALTER TABLE "fields" ADD FOREIGN KEY ("farmId") REFERENCES "farms" ("id");