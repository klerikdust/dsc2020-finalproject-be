const bodyParser = require(`body-parser`)
const express = require(`express`)
module.exports = () => {
    const app = express()
    //  Middlewares.
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: true }))
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
    //  Prepare routers.
    require(`./routes/province.routes`)(app)
    //  Listening to port.
    const port = 3000
    app.listen(port, console.debug(`Server currently listening on port ${port}.`))
}