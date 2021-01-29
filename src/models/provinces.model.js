const db = require(`../database/client`)
/**
 * Province Models.
 * The method used for the query is `.execute()`, because it contains anti SQL-Injection pattern in it.
 * for the documentation reference, head to <https://www.npmjs.com/package/mysql2#using-prepared-statements>
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
        return db.execute(`
			SELECT * 
			FROM provinces
			WHERE is_deleted = 0`, (err, data) => {
            if (err) return res(err, null)
            return res(null, data)
        })
    }

	/**
	 * Inserting new province data into database.
	 * @param {object} provindeData The province's data to be registered.
	 * @param {function} res
	 * @return {object|null}
	 */
	insertNewProvince(provinceData, res) {
		return db.execute(`INSERT INTO provinces(name, recovered, death, positive) VALUES(?, ?, ?, ?)`,
		[provinceData.name, provinceData.recovered, provinceData.death, provinceData.positive], err => {
			if (err) return res(err)
			return res(null)
		})
	}

	/**
	 * Get province data by id.
	 * @param {number} id Target province.
	 * @param {function} res
	 * @return {object}
	 */
	getProvince(id, res) {
		return db.execute(`
			SELECT name, recovered, death, positive 
			FROM provinces 
			WHERE 
				id = ?
				AND is_deleted = 0`, [id], (err, data) => {
			if (err) return res(err, null)
			return res(null, data[0])	
		})
	}

	/**
	 * Updating province's data.
	 * @param {object} provinceData The new province's data.
	 * @param {function} res
	 * @return {object}
	 */
	updateProvince(provinceData, res) {
		return db.execute(`
			UPDATE provinces 
			SET
				updated_at = now(), 
				name = ?,
				recovered = ?,
				death = ?,
				positive = ? 
			WHERE id = ?`, [provinceData.name, provinceData.recovered, provinceData.death, provinceData.positive, provinceData.id], (err) => {
			if (err) return res(err, null)
			return res(null, provinceData)
		}) 
	}

	/**
	 * Soft delete the province
	 * @param {number} id Target province.
	 * @param {function} res
	 * @return {object}
	 */
	softDeleteProvince(provinceId, res) {
		return db.execute(`
			UPDATE provinces
			SET is_deleted = 1
			WHERE 
				id = ?
				AND is_deleted = 0`, [provinceId], (err, data) => {
			if (err) return res(err, null)
			return res(null, data)
		})
	}

	/**
	 * Check if ID is exists or not.
	 * @param {number} id Target province id
	 * @param {function} res
	 * @return {boolean}
	 */
	isProvinceIdExist(id, res) {
		return db.execute(`
			SELECT COUNT(*) AS count 
			FROM provinces 
			WHERE 
				id = ?
				AND is_deleted = 0`, [id], (err, data) => {
			if (err) return res(err, null)
			return res(null, data[0].count > 0 ? true : false)
		})
	}
}
module.exports = Province
