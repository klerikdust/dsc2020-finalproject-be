const Province = require(`../models/provinces.model`)
module.exports = {
	/**
	 * ------------------------------
	 * Fetch All Provinces Controller
	 * ------------------------------
	 */
	getAll: (req, res) => {
        const src = new Province()
        src.getAllProvinces((err, data) => {
            if (err) {
                console.debug(err)
				return res.status(500).send({
                    status: false,
					message: `Fetching data failed.` 
                })
            }
    		//  Parse objects
			const parsedData = data.map(node => {
				return {
					name: node.name,
					recovered: node.recovered,
					death: node.death,
					positive: node.positive,
					url: `/api/v1/provinces/${node.id}`
				}
			})
			return res.status(200).send({
                status: true,
                totalData: data.length,
                message: `Fetching provinces data success.`,
                data: parsedData 
            })
        })
    },

	/**
	 * ------------------------------
	 * Insert New Province Controller
	 * ------------------------------
	 */
	insert: (req, res) => {
		let { name, recovered, death, positive } = req.body
		//  Handle if there are empty request's body parameters
		const bodyTypes = [name, recovered, death, positive].map(v => typeof v)
		if (bodyTypes.includes(undefined)) {
			return res.status(400).send({
				status: false,
				message: `Incomplete required body.`
			})
		}
		//  Handle if statistic values were decimals.
		const integerStatisticValues = [recovered, death, positive].map(v => /^-?[0-9]+(e[0-9]+)?$/.test(v))
		if (integerStatisticValues.includes(false)) {
			return res.status(400).send({
				status: false,
				message: `Values type for statistical data must be integer.`
			})
		}
		//  Sanitize statistic values
		recovered = parseInt(recovered)
		death = parseInt(death)
		positive = parseInt(positive)
		//  Handle if statistic values were below zero.
		const negativeStatisticValues = [recovered, death, positive].filter(v => v < 0)
		if (negativeStatisticValues.length > 0) {
			return res.status(400).send({
				status: false,
				message: `Values type for statistical data must be equal or above zero.`
			})
		}
		const src = new Province()
		src.insertNewProvince(req.body, (err, data) => {
			if (err) {
				console.debug(err)
				return res.status(500).send({
					status: false,
					message: `Storing data failed.` 
				})
			}
			return res.status(200).send({
				status: true,
				message: `Storing data success.`,
				stored: {
					name: name,
					recovered: recovered,
					death: death,
					positive: positive
				}
			})
		})
	},
	
	/**
	 * ------------------------------
	 * Province Update Controller
	 * ------------------------------
	 */
	update: (req, res) => {
		let { id, name, recovered, death, positive } = req.body
		//  Handle if there are empty request's body parameters
		const bodyTypes = [id, name, recovered, death, positive].map(v => typeof v)
		if (bodyTypes.includes(undefined)) {
			return res.status(400).send({
				status: false,
				message: `Incomplete required body.`
			})
		}
		//  Handle if statistic values were decimals.
		const integerStatisticValues = [recovered, death, positive].map(v => /^-?[0-9]+(e[0-9]+)?$/.test(v))
		if (integerStatisticValues.includes(false)) {
			return res.status(400).send({
				status: false,
				message: `Values type for statistical data must be integer.`
			})
		}
		//  Sanitize statistic values
		recovered = parseInt(recovered)
		death = parseInt(death)
		positive = parseInt(positive)
		//  Handle if statistic values were below zero.
		const negativeStatisticValues = [recovered, death, positive].filter(v => v < 0)
		if (negativeStatisticValues.length > 0) {
			return res.status(400).send({
				status: false,
				message: `Values type for statistical data must be equal or above zero.`
			})
		}
		const src = new Province()
		src.isProvinceIdExist(id, (err, isExist) => {
			if (err) {
				console.debug(err)
				return res.status(500).send({
					status: false,
					message: `An error occured during province ID check.`	
				})	
			}
			//  Handle if province ID is not exists
			if (!isExist) {
				return res.status(400).send({
					status: false,
					message: `Province id not found.`
				})
			}
			//  Save old province data
			src.getProvince(id, (getErr, oldData) => {
				if (getErr) {
					console.debug(getErr)
					return res.status(500).send({
						status: false,
						message: `Failed to fetch old province's data.`
					})
				}		
				//  Do update
				src.updateProvince(req.body, updateErr => {
					if (updateErr) {
						console.debug(updateErr)
						return res.status(500).send({
							status: false,
							message: `Updating province data failed.`
						})
					}
					//  Checkout new data to ensure it is updated
					src.getProvince(id, (getErr, newData) => {
						if (getErr) {
							console.debug(getErr)
							return res.status(500).send({
								status: false,
								message: `Failed to fetch new province's data.`
							})
						}
						//  Complete
						return res.status(200).send({
							status: true,
							message: `Updating province data success.`,
							before: oldData,
							after: newData
						})
					})	
				})
			})
		})
	},

	/**
	 * ------------------------------
	 * Province Delete Controller
	 * ------------------------------
	 */
	delete: (req, res) => {
		const { id } = req.body
		if (!id) {
			return res.status(400).send({
				status: false,
				message: `Target province 'id' is required.` 
			})
		}
		const src = new Province()
		src.isProvinceIdExist(id, (err, isExist) => {
			if (err) {
				console.debug(err)
				return res.status(500).send({
					status: false,
					message: `An error occured during province ID check.`	
				})	
			}
			if (!isExist) {
				return res.status(400).send({
					status: false,
					message: `Province id not found.`
				})
			}
			src.getProvince(id, (getErr, originalData) => {
				if (getErr) {
					console.debug(getErr)
					return res.status(500).send({
						status: false,
						message: `An error occured during province data fetch.` 
					})
				}
				src.softDeleteProvince(id, (delErr, meta) => {
					if (delErr) {
						console.debug(delErr)
						return res.status(500).send({
							status: false,
							message: `Destroy data failed.`
						})
					}
					//  Handle if the province already deleted even before this query is performed.
					if (meta.affectedRows <= 0) {
						return res.status(500).send({
							status: true,
							message: `The province was already destroyed.`
						})
					}
					//  Complete
					return res.status(200).send({
						status: true,
						message: `Destroy data success.`,
						stored: originalData
					})
				})
			})
		})
	},
	/**
	 * ------------------------------
	 * Get Single Province Controller
	 * ------------------------------
	 */
	getSingle: (req, res) => {
		const { id } = req.params
		if (!id) {
			return res.status(400).send({
				status: false,
				message: `Parameter 'id' is required.` 
			})
		}
		const src = new Province()
		src.isProvinceIdExist(id, (err, isExist) => {
			if (err) {
				console.debug(err)
				return res.status(500).send({
					status: false,
					message: `An error occured during province ID check.`	
				})	
			}
			if (!isExist) {
				return res.status(400).send({
					status: false,
					message: `Province id not found.`
				})
			}
			src.getProvince(id, (getErr, data) => {
				if (getErr) {
					console.debug(err)
					return res.status(500).send({
						status: false,
						message: `An error occured during province fetch`
					})
				}
				return res.status(200).send({
					status: true,
					stored: data
				})
			})
		})	
	}
}
