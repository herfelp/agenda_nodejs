const http = require('http'),
  path = require('path'),
  Routing = require('./rutas.js'),
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const Users = require('./models/models.js');

const PORT = 8083;
const app = express();
const Server = http.createServer(app);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/agenda', {
  useMongoClient: true
}, function(err, db) {

  if (err) {
    console.log(err)
  } else {
    console.log("Conexion establecida con la base de datos")

    var user = new Users({
      nombre: "usuario_prueba",
      password: Math.floor((Math.random() * 1000000) + 100000)
    });

    /*
    user.save(function(err){
     if(!err){
       console.log("Credenciales de acceso:")
       console.log("Usuario: "+user.nombre)
       console.log("Contraseña: "+user.password)
     }else{
       console.log("Error" + err);
     }
   });

   */

  }
});

app.use(express.static(__dirname + '/client/js'));
app.use(express.static(__dirname + '/client/css'));
app.use(express.static(__dirname + '/client/img'));
app.use(express.static('./client'));
app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/agenda", function(req, res) {
  Users.findOne({ nombre: req.body.usuario, password: req.body.pass}, function(err, user) {
    console.log(user);
    if(user != null){
      res.sendFile(__dirname + "/client/main.html");
    }else {
      console.log("Usuario y/o contraseña no corresponden");
        res.redirect("/");
    }
  });
});


app.get("/agenda", function(req, res) {
  res.sendFile(__dirname + "/client/main.html");
});


app.use("/app", Routing);

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
});
