import mysql from "mysql2";
import Postgrator from "postgrator";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrateDB() {
	const client = mysql.createConnection({
		multipleStatements: true,
		host: "localhost",
		user: "alin",
		database: "routiner",
		password: "wingmanomul",
	});

	await client.connect();
	const postGrator = new Postgrator({
		migrationPattern: join(__dirname, "scripts/*"),
		driver: "mysql",
		database: "routiner",
		execQuery: (query) => {
			return new Promise((resolve, reject) => {
				client.query(query, (err, rows, fields) => {
					if(err) {
						return reject(err);
					}
					const results = {rows, fields};
					return resolve(results);
				})
			})
		},
	});

	const result = await postGrator.migrate();

	if (!result.length) {
		console.log("No migrations, already done");
	}
	if (result.length) {
		console.log("Migration done.");
	}
	await client.end();
}

migrateDB();
