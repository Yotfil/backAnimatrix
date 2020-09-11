const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SerieSchema = Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    sinopsis: { type: String, required: true },
    precluela: String,
    secuela: String,
    image: { type: String, required: true },
    numeroCapitulos: Number,
})


module.exports = mongoose.model('Serie', SerieSchema)