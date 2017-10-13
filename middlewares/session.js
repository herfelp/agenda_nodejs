const Users = require('../models/users.js');


module.exports = function (req, res, next){

if(!req.session.user_id){
  res.redirect("/");
}
else{
  Users.findById(req.session.user_id, function(err,user){
    if(err){
      console.log(err);
      res.redirect("/");
    }else{
        //console.log(req.session.user_id);
        res.locals = { user: user};
        next();
    };
  });

}


}
