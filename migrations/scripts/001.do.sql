-- create users table
CREATE TABLE users (
 "id" SERIAL PRIMARY KEY,
 "userId" UUID DEFAULT uuid_generate_v4(),
 "username" VARCHAR(255) NOT NULL,
 "password" VARCHAR(255) NOT NULL,
 "email" VARCHAR(255) NOT NULL UNIQUE
);

-- create routines table

CREATE TABLE routines (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "title" VARCHAR(20) NOT NULL,
  "description" VARCHAR(235) DEFAULT '',
  "start_date" DATE NOT NULL,
  "end_date" DATE NOT NULL,
  "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "modified_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" VARCHAR(45) NOT NULL
);



-- create todos table
CREATE TABLE todos (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "title" VARCHAR(32) NOT NULL,
  "description" VARCHAR(64) DEFAULT '',
  "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "modified_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create routines_todos
CREATE TABLE routines_todos (
  "routine_id" UUID NOT NULL,
  "todo_id" UUID NOT NULL,
  PRIMARY KEY (routine_id, todo_id),
  FOREIGN KEY (routine_id) REFERENCES routines (id),
  FOREIGN KEY (todo_id) REFERENCES todos (id)
);
