
const express = require('express')
const cap = require('../controllers/caps')
const mdAuth = require('../middlewares/authenticated')


const api = express.Router()
const multipart = require('connect-multiparty')
const uploadSong = multipart({ uploadDir: './assets/caps' })

api.post('/create-song/:idSerie', uploadSong, cap.create)
api.get('/getAll/:page/:idSerie', /*mdAuth.authUser,*/ cap.findAll)
api.get('/getSongFile/:nameCap', cap.getCapFile)
api.get('/getCapsSerie/:idSerie', cap.getCapsSerie)
api.get('/getTotalSongs', mdAuth.authUser, cap.getTotalCaps)

module.exports = api