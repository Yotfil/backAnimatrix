const mongoose = require('mongoose'); //Requerimos mongoose para conectarnos con la base de datos
const app = require('./app'); //Requerimos nuestra app que configuramos en le archivo app.js
const port = 80;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
const URI = "mongodb+srv://animatrix:animatrix@animatrixdb.synvy.mongodb.net/animatrixdb?retryWrites=true&w=majority"


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log('No nos pudimos conectar');
    } else {
        console.log('La base de datos funciona!');
        app.listen(port, () => {
            console.log(`El demonio está vigilando en el puerto ${port}`)
        })
    }
})