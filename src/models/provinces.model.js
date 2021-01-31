const db = require(`../database/client`)
/**
 * Province Models.
 * Supported by knex interfaces.
 * @author {Nabil} 
 * @constructor
 */
class Province {
    /**
     * Fetching all the available registered provinces.
     * @param {function} res
     * @return {object}
     */
    getAllProvinces(res) {
        return db
			.select(`*`)
			.from(`provinces`)
			.where(`deleted_at`, null)
			.then(data => res(null, data))
			.catch(err => res(err, null))
    }

	/**
	 * Inserting new province data into database.
	 * @param {object} provindeData The province's data to be registered.
	 * @param {function} res
	 * @return {object|null}
	 */
	insertNewProvince(provinceData, res) {
		return db(`provinces`)
			.insert({
				name: provinceData.name,
				recovered: provinceData.recovered,
				death: provinceData.death,
				positive: provinceData.positive
			})
			.then(data => res(null))
			.catch(err => res(err))
	}

	/**
	 * Get province data by id.
	 * @param {number} id Target province.
	 * @param {function} res
	 * @return {object}
	 */
	getProvince(id, res) {
		return db
			.select(`name`, `recovered`, `death`, `positive`)
			.from(`provinces`)	
			.where(`id`, id)
			.whereNull(`deleted_at`)
			.then(data => res(null, data[0]))
			.catch(err => res(err, null))	
	}

	/**
	 * Updating province's data.
	 * @param {object} provinceData The new province's data.
	 * @param {function} res
	 * @return {object}
	 */
	updateProvince(provinceData, res) {
		return db(`provinces`)
			.where(`id`, provinceData.id)
			.update({
				updated_at: db.fn.now(),
				name: provinceData.name,
				recovered: provinceData.recovered,
				death: provinceData.death,
				positive: provinceData.positive
			})
			.then(() => res(null, provinceData))
			.catch(err => res(err, null))
	}

	/**
	 * Soft delete the province
	 * @param {number} id Target province.
	 * @param {function} res
	 * @return {object}
	 */
	softDeleteProvince(provinceId, res) {
		return db(`provinces`)
			.where(`id`, provinceId)
			.whereNull(`deleted_at`)
			.update(`deleted_at`, db.fn.now())
			.then(data => res(null, data))
			.catch(err => res(err, null))
	}

	/**
	 * Check if ID is exists or not.
	 * @param {number} id Target province id
	 * @param {function} res
	 * @return {boolean}
	 */
	isProvinceIdExist(id, res) {
		return db(`provinces`)
			.count(`id AS data`)
			.where(`id`, id)
			.whereNull(`deleted_at`)
			.then(total => res(null, total[0].data > 0 ? true : false))
			.catch(err => res(err, null))
	}
}
module.exports = Province
