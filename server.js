const express = require('express');
const app = express();
const mongoose = require('mongoose');
const modelContact = require('./model/modelContact');
const bodyParser = require('body-parser');
const listeContacts = require('./client/data/liste');


//ouvre une connexion db appelé eleveIFA
mongoose.connect('mongodb://localhost/contact');

function addAllContact(listeContacts){
    
    /* Je boucle ma liste éleve */
    listeContacts.forEach(function(value) {
       
        var nouveauContact = new modelContact(value);
        nouveauContact.save(function(err, res2) {

            if(err)
            {
                console.log(err);
    
            } else {
                
                console.log(res2);
            }
        });

    });

}


//connexion a la DB si il se connecte envoi un message ainsi losrqu'il ne se connecte pas egalement
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',function() {
console.log('DB Connected ! ');


//addAllEleve(listEleves);

});

// je configure mon body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*declaré un repertoire static*/
app.use('/static', express.static('client'));

app.get('/', function(req, res) {

    /* Envoi une réponse au client*/
    res.sendFile(__dirname + '/client/contact.html');

});


/* API qui retourne ma liste éleve de ma base de donnée (Quand je récupere = GET) */
app.get('/api/contacts/show',function(req,res){
    modelContact.find({},function(err,resContact){
        if(err)
        return console.log('error');
        res.send(resContact);
        console.log(resContact);
    })
});





/* API qui retourne ma liste éleve de ma base de donnée (Quand je crée = POST) */
app.post('/api/contacts/add',function(req,res){
   
    /* Ici je passe les variable de mon body dans mon modèleEleve */
    var newContact = new modelContact(req.body);
   
    /* J'insère en base de donnée mes données et j'affiche le resultat à l'aide un callback */
    newContact.save(function(err, res2) {

        if(err)
        {
            res.send(err);

        } else {
            res.send(res2);
        }

    });    
});

//supprimer un eleve de ma base de données

app.delete('/api/contacts/delete/:id', function(req,res) {

      if (!req.params.id) {
      res.status(400).json({
          "text": "Requête invalide"
      })
    } else {             
      modelContact.findOneAndDelete({_id: req.params.id},function(err,res2){
        if(err) {
          console.log(err)
        } else {
          res.send('Contact supprimé !')
        }
      })
    }
});

//modifier un eleve de ma base de données

app.put('/api/contacts/modifier', function(req,res) {
console.log(req.body);

    if (!req.body) {
    res.status(400).json({
        "text": "Requête invalide"
    })
  } else {             
    modelContact.findOneAndUpdate({_id: req.body._id},req.body,function(err,res2){
      if(err) {
        console.log(err)
      } else {
        res.send('Contact modifié !')
      }
    })
  }
});
  




 /* écoute sur le port 8080*/
app.listen(8080,function(){
    console.log('Server lancé ! ')
});

