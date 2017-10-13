const Router = require('express').Router();
const Users = require('./models/users.js')
const Evento = require('./models/events.js')


Router.get("/all", function(req, res) {
  Evento.find({
    userId: req.session.user_id
  }).exec(function(err, eventos) {
    if (err) {
      res.status(500)
      res.json(err)
    }
    res.json(eventos);
  })
});


Router.post('/new', (req, res) => {
  let evento = new Evento({
    userId: req.session.user_id,
    id: Math.floor(Math.random() * 50000000000),
    start: req.body.start,
    title: req.body.title,
    end: req.body.end
  });

  evento.save(function(error) {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Nuevo evento registrado con éxito!")
  })
});




Router.post('/delete/:id', function(req, res) {
  let eid = req.params.id;

  Evento.remove({
    id: eid
  }, function(error) {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Registro eliminado")
  })
})


Router.post('/actualizar/:id/:sta/:en_', function(req, res) {
  let eid = req.params.id;
  let ini = req.params.sta;
  let fin = req.params.en_;

  Evento.find({
    id: eid
  }, function(error, result) {
    if (error) {
      res.status(500)
      res.json(error)
    }

    Evento.update({
      start: ini,
      end: fin
    }, function(error, result) {
      if (error) {
        res.status(500)
        res.json(error)
      }

      res.send()
    })
  })

})






module.exports = Router;
