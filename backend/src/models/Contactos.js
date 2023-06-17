const mongoose = require('mongoose');

const ContactosSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    email:String,
    message:String,
    date:Date
});

const Contactos = mongoose.model('Contactos',ContactosSchema);

module.exports = Contactos;