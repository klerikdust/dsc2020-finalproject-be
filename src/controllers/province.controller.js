const Province = require(`../models/provinces.model`)
module.exports = {
    getAll: (req, res) => {
        const src = new Province()
        src.getAllProvinces((err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || `An error was occured while fetching the provinces data.`
                })
            }
            return res.status(200).send({
                status: true,
                totalData: data.length,
                message: `Fetching provinces data success.`,
                data: data
            })
        })
    }   
}