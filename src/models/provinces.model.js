const db = require(`../database`)
/**
 * Province Handlers.
 * @author {Nabil} 
 * @constructor
 */
class Province {
    /**
     * Fetching all the available registered provinces.
     * @param {object} res
     * @return {object}
     */
    getAllProvinces(res) {
        return db.query(`SELECT * FROM provinces`, (err, data) => {
            //  Handle if there's an error during fetching
            if (err) {
                console.debug(`[Province.getAllProvinces] There's an error during fetching and now will fallback into empty JSON`)
                return res(err, null)
            }
            //  Handle if returned result is empty
            if (data.length <= 0) {
                console.debug(`[Province.getAllProvinces] Sucessfully fetched provinces, but apparently its empty.`)
                return res({message: `empty provinces data.`}, null)
            }
            //  Otherwise, return just like usual.
            console.debug(`Successfully fetched ${data.length} provinces.`)
            return res(null, data)
        })
    }
}
module.exports = Province