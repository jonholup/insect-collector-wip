
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsectSchema = new Schema({
  // imageURL: { type: String, required: true, unique: true },
  description: String,
  user_id: String,
  created: Date,
  file: Object
//
});

var Insect = mongoose.model('Insect', InsectSchema);

module.exports = Insect;


