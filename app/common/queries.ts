export const INSERT_USER_QUERY =
	"INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";

export const INSERT_GET_USER_IMMEDIETALY_QUERY =
	"SELECT \"userId\" FROM users WHERE id=(SELECT currval(pg_get_serial_sequence('users', 'id')))";

export const GET_USER_BY_EMAIL_QUERY = "SELECT * FROM users WHERE email=$1";

export const GET_USER_QUERY = `SELECT "username", "email", "id", "userId" FROM users WHERE "userId"=$1;`;

export const DELETE_USER_QUERY = `DELETE FROM users WHERE "userId"=$1`;

export const GET_TODO_ITEM_QUERY = "SELECT * FROM todos WHERE id=$1";

export const INSERT_TODO_ITEM_QUERY =
	"SET @lastId=UUID();INSERT INTO todos (id, title, description, created_at, modified_at, routine_id) VALUES(@lastId, $1, $2, NOW(), NOW(), $3);SELECT * FROM todos WHERE id=@lastId;";

export const DELETE_TODO_ITEM_QUERY = "DELETE FROM todos WHERE id=$1";

export const UPDATE_USER_QUERY = `UPDATE users 
SET username = COALESCE(NULLIF($1, ''), username),
		password = COALESCE(NULLIF($2, ''), password),
		email = COALESCE(NULLIF($3, ''), email) 
WHERE "userId"=$4`;

export const GET_ROUTINE_QUERY = `
SELECT 
  r.id, 
  r.title,
  r.description,
  r.start_date,
  r.end_date,
  r.created_at,
  r.modified_at,
  r.created_by,
  JSON_ARRAYAGG(
      JSON_OBJECT(
      'id', t.id, 
      'title', t.title, 
      'description', t.description, 
      'created_at', t.created_at, 
      'modified_at', t.modified_at
      )
  ) AS todos
FROM 
  routines r
LEFT JOIN 
  routines_todos rt ON r.id = rt.routine_id
LEFT JOIN 
  todos t ON rt.todo_id = t.id
AND 
	r.id=?
GROUP BY 
  r.id;
`;

export const GET_USER_ROUTINES_QUERY = `
SELECT
  r.id,
  r.title,
  JSON_ARRAYAGG(
      JSON_OBJECT(
      'id', t.id, 
      'title', t.title, 
      'description', t.description, 
      'created_at', t.created_at, 
      'modified_at', t.modified_at
      )
  ) AS todos
FROM
  routines r
LEFT JOIN
  routines_todos rt ON r.id = rt.routine_id
AND
	r.created_by=$1
LEFT JOIN
  todos t ON rt.todo_id = t.id
GROUP BY
  r.id;
`;

export const INSERT_ROUTINE_QUERY = `SELECT create_new_routine($1, $2, $3, $4, $5);`;

export const DELETE_ROUTINE_QUERY = "DELETE FROM routines WHERE id=? AND created_by=?;";

export const DELETE_ROUTINE_TODOS_QUERY = "DELETE FROM todos WHERE routine_id=?;";
