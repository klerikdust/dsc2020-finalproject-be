const knex = require(`knex`)
/**
 *  DB_HOST for the target host.
 *  DB_USER for the username.
 *  DB_PASS for the user's password.
 *  DB_NAME for the target database.
 *
 *  NOTES:
 *  Before doing the CRUD operation; please checkout README.md in the root directory
 *  for the guide on database migration using knex package.
 *  @author {Nabil}
 */
const connection = knex({
	client: `mysql2`,
	connection: {
		host: process.env.DB_HOST, 
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	}
})
module.exports = connection
