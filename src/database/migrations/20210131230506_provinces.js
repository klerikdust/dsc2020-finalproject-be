exports.up = function(knex, Promise) {
	return knex.schema.createTable(`provinces`, table => {
		table.increments(`id`)
		table.datetime(`registered_at`, { precision: 6 }).defaultTo(knex.fn.now(6))
		table.datetime(`updated_at`, { precision: 6 }).defaultTo(knex.fn.now(6))
		table.string(`name`).notNullable()
		table.bigInteger(`recovered`).notNullable().defaultTo(0)
		table.bigInteger(`death`).notNullable().defaultTo(0)
		table.bigInteger(`positive`).notNullable().defaultTo(0)
		table.datetime(`deleted_at`, { precision: 6 }).defaultTo(null)
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable(provinces)  
}
