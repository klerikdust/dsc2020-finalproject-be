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
        //  If x-api-key doesn't match, then return.
        if (key !== `DSC2020BACKEND`) {
            console.debug(`Unknown ${key} key has been rejected.`)
            return res.status(403).send({
                message: `Unauthorized x-api-key. Please use the correct token that has been provided by DSC Binus Kemanggisan.`
            })
        }
        //  Else, proceed to province routers.
        console.debug(`Access from ${key} has been authorized.`)
        next()
    })
    app.use(`/`, router)
	const port = 3000
    app.listen(port, console.debug(`Server currently listening on port ${port}.`))
}
