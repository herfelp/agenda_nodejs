const http = require('http'),
  path = require('path'),
  Router = require('./rutas.js'),
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cookieSession = require("cookie-session"),
  methodOverride = require("method-override"),
  session_middleware = require("./middlewares/session");

const Users = require('./models/users.js');


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

        user.save(function(err){
         if(!err){
           console.log("Credenciales de acceso:")
           console.log("Usuario: "+user.nombre)
           console.log("Contraseña: "+user.password)
         }else{
           console.log("Error" + err);
         }
       });

  }
});

app.use(express.static(__dirname + '/client/js'));
app.use(express.static(__dirname + '/client/css'));
app.use(express.static(__dirname + '/client/img'));
app.use(express.static('./client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride("_method"));

app.use(cookieSession({
  name:"session",
  keys:["llave-1","llave-2"]
}));


app.post("/login", function(req, res) {
  Users.findOne({
      nombre: req.body.user,
      password: req.body.pass
    },
    function(err, user) {
      if (user != null) {
        req.session.user_id = user._id;
        res.send("Validado");
      } else {
        res.send("No_validado");
      }
    });
});




app.use("/events", session_middleware);
app.use("/events", Router);

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
});
