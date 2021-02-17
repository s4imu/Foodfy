CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" text,
  "information" text,
  "chef_id" int,
  "created_at" timestamp DEFAULT (now()),
  "ingredients" text[],
  "preparation" text[]
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "created_at" timestamp,
  "file_id" int
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "file_id" int
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files"("id");

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "chefs" "files"("id");
