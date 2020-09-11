const express = require('express')
const series = require('../controllers/series')
const mdAuth = require('../middlewares/authenticated')
const api = express.Router()
const multipart = require('connect-multiparty')
const uploadSerie = multipart({ uploadDir: './assets/series' })

api.post('/create-serie', uploadSerie, series.create)
api.get('/getAllSeries/:page', /**mdAuth.authUser,*/ series.findAll)
api.get('/getSerieFile/:image', series.getSerieFile)
api.get('/getTotalSeries', /**mdAuth.authUser,*/ series.getTotalSeries)
api.get('/getOne/:idSerie',/**mdAuth.authUser,*/ series.findOne)
// api.get('/getFavorites',/**mdAuth.authUser,*/ series.favoritoSerie)

module.exports = api;
