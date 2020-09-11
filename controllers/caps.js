const Cap = require('../models/caps')

let fs = require('fs');
const path = require('path')

/**
 * Función la cual permitirá validar si el body está vacío o si existe algún archivo para la canción
 * @param {*} req => Parametros que se envían desde las funciones create y update.
 * @param {*} res => Respuesta a retornar.
 */
function verificarDatos(req, res) {
    if (!req.body) {
        return res.status(400).send({ message: 'El contenido no puede estar vacío' })
    }

    if (!req.files) {
        return res.status(400).send({
            message: 'Debes ingresar el archivo'
        })
    }
}

/**
 * Función creada para procesar el archivo de la canción y obtener el nombre de la canción.
 * @param {*} req => Requerimientos enviados desde el body.
 */
function obtenerNombreCancion(req) {
    let routeFile = req.files.file.path //Obtenemos la ruta del archivo
    let splitFile = routeFile.split('\\')
    return splitFile[splitFile.length - 1]
}


exports.create = (req, res) => {

    verificarDatos(req, res)
    const reqBody = req.body
    const idSerie = req.params.idSerie
    console.log(idSerie, "ID SERIE-------------------");

    const cap = new Cap()


    cap.seriesId = idSerie
    cap.capNumber = req.body.capNumber
    cap.capName = req.body.capName
    cap.duration = req.body.duration
    cap.file = obtenerNombreCancion(req)


    cap.save().then(data => {
        res.send(data)

    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error al subir capitulo'
        })
    })

}


exports.findAll = (req, res) => {
    let page = ((req.params.page - 1) * 10)
    let idSerie = req.params.idSerie

    Cap.find({ seriesId: idSerie }, null, { skip: page, limit: 50 })
        .populate("seriesId")
        .exec()
        .then(caps => {
            res.send(caps)
        }).catch(error => {
            res.status(500).send({
                message: error.message || "Error al obtener las capitulo"
            })
        })
}

exports.getCapsSerie = (req, res) => {

    const idSerie = req.params.idSerie

    Cap.find({ seriesId: idSerie }, (err, caps) => {
        if (err) {
            console.log(err);
        } else {
            if (!caps) {
                console.log("No hay capitulos de esta serie");
            } else {
                res.status(200).send({
                    caps
                })
            }
        }
    })

}

exports.getCapFile = (req, res) => {
    const capsRoute = './assets/caps/' + req.params.nameCap;
    fs.exists(capsRoute, (exist) => {
        if (exist) {
            res.sendFile(path.resolve(capsRoute))
        } else {
            res.status(404).send({
                message: "El archivo no existe"
            })
        }
    })
}

exports.getTotalCaps = (req, res) => {
    Cap.countDocuments().then(count => {
        res.status(200).send({
            total: count
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message || "error al obtener el capitulo"
        })
    })
}