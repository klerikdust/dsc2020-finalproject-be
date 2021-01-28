const province = require(`../controllers/province.controller`)
module.exports = app => {
    /** -----------------
     *  GET ALL PROVINCES
     *  /api/v1/provinces
     *  -----------------
     */
    app.get(`/api/v1/provinces`, province.getAll)
}
