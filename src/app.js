const bodyParser = require(`body-parser`)
const express = require(`express`)
const router = require(`./routes/province.routes`)
const hpp = require(`hpp`)
module.exports = () => {
    const app = express()
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: true }))
	app.disable(`x-powered-by`)
	app.use(hpp())
	app.use((req, res, next) => {
        const key = req.headers[`x-api-key`]
		//  Handle if x-api-key wasn't provided.
		if (key === undefined) {
			return res.status(400).send({
				stauts: false,
				message: `Missing x-api-key`
			})
		}
		//  If x-api-key doesn't match, then return.
        if (key !== process.env.API_KEY) {
            return res.status(403).send({
                status: false,
				message: `Unauthorized x-api-key. Please use the correct token that has been provided by DSC Binus Kemanggisan.`
            })
        }
        //  Else, proceed to province routers.
        next()
    })
    app.use(`/`, router)
	//  Handle invalid endpoints
	app.use((req, res) => {
		return res.status(404).send({
			status: false,
			message: `Invalid endpoint.`
		})
	})
	const port = 3000
    app.listen(port, console.debug(`Server currently listening on port ${port}.`))
}
