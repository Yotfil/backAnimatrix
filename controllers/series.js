const Serie = require('../models/series')
const Cap = require('../models/caps')


let fs = require('fs');
const path = require('path')

function verificarDatos(req, res) {
    console.log("req --->", req.body)
    if (!req.body) {
        return res.status(400).send({ message: 'El contenido no puede estar vacío' })
    }

    if (!req.files) {
        return res.status(400).send({
            message: 'Debes ingresar el archivo'
        })
    }
}


function obtenerImagen(req) {
    let routeFile = req.files.image.path //Obtenemos la ruta del archivo
    let splitFile = routeFile.split('\\')
    return splitFile[splitFile.length - 1]
}

exports.create = (req, res) => {

    verificarDatos(req, res)

    Serie.countDocuments().then(count => {
        const serie = new Serie({
            sinopsis: req.body.sinopsis,
            name: req.body.name,
            image: obtenerImagen(req),
            genre: req.body.genre,
            author: req.body.author
        })

        serie.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Error al crear serie'
            })
        })
    })
}
// Preguntar------------------------------------------------<
exports.findAll = (req, res) => {
    let page = ((req.params.page - 1) * 10)

    let name = new RegExp(`.*${req.query.searchBy || ''}.*`, 'i')

    Serie.find({ genre: name }, null, { skip: page, limit: 20 })
        .then(series => {
            res.send(series)
        }).catch(error => {
            res.status(500).send({
                message: error.message || "Error al obtener la serie"
            })
        })
}


exports.findOne = (req, res) => {
    const idSerie = req.params.idSerie

    Serie.findById(idSerie, (err, serie) => {
        if (err) {
            console.log("nosirve");
        } else {
            if (!serie) {
                console.log("no llego la serie");
            } else {
                res.status(200).send({
                    serie
                })

            }
        }
    })
}

exports.getSerieFile = (req, res) => {
    const serieRoute = './assets/series/' + req.params.image;
    fs.exists(serieRoute, (exist) => {
        if (exist) {
            res.sendFile(path.resolve(serieRoute))
        } else {
            res.status(404).send({
                message: "El archivo no existe"
            })
        }
    })
}

exports.getTotalSeries = (req, res) => {
    Serie.countDocuments().then(count => {
        res.status(200).send({
            total: count
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message || "error al obtener las series"
        })
    })
}

// exports.favoritoSerie = (req, res) => {
//     Serie.find().then(seriesfav => {
//         res.status(200).send({
//             seriesfavorito: seriesfav
//         })
//     }).catch(error => {
//         res.status(500).send({
//             message: error.message || "error al obtener favorito"
//         })

//     })
// }