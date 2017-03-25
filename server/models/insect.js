
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsectSchema = new Schema({
  imageURL: { type: String, required: true, unique: true },
  description: { type: String},
  user_id: { type: String}
//
});

var Insect = mongoose.model('Insect', InsectSchema);

module.exports = Insect;

