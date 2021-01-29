const province = require(`../controllers/province.controller`)
const express = require(`express`)
const router = express.Router()
router.route(`/api/v1/provinces/`)
//  Body Routing
.get(province.getAll)
.post(province.insert)
.put(province.update)
.delete(province.delete)
//  Parameter Routing for single province search
router.route(`/api/v1/provinces/:id`)
.get(province.getSingle)
module.exports = router
