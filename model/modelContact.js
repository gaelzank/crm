const mongoose = require('mongoose');

const contactAPI = new mongoose.Schema({
    nom:String,
    prenom:String,
    poste:String,
    tel:Number,
    telmob:Number,
    adresse:String,
    site:String,
    mail:String,
    notes:String,
    societe: String,
    

})

var Schema_contacts = mongoose.model('Contacts', contactAPI);
module.exports = Schema_contacts;

