const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  nombre: { type: String },
  password: { type: String}
})




let UserModel = mongoose.model('Usuario', UserSchema)


module.exports = UserModel;
