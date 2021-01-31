require(`dotenv`).config()
module.exports = {
	client: `mysql2`,
	migrations: {
		directory: __dirname + `/src/database/migrations`
	},
	connection: {
		host: process.env.DB_HOST, 
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	}	
}


