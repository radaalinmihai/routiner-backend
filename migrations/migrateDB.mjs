import mysql from "mysql2";
import Postgrator from "postgrator";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrateDB() {
	const client = mysql.createConnection({
		multipleStatements: true,
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USERNAME,
		database: process.env.DATABASE_NAME,
		password: process.env.DATABASE_PASSWORD,
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
