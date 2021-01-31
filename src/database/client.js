const knex = require(`knex`)
/**
 *  If you wish to use custom parameters for the db, please store them inside .env file
 *  in root.
 *  DB_HOST for the target host.
 *  DB_PORT for the target port to listen.
 *  DB_USER for the username.
 *  DB_PASS for the user's password.
 *  DB_NAME for the target database.
 *
 *  NOTES:
 *  Before doing the CRUD operation; please check out `structure.md` in current path.
 *  The file contains the used schema for provinces table.
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
