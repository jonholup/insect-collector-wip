
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsectSchema = new Schema({
  description: {type: String}, /*default: 'uploaded'},*/
  file: Object,
  created: Date

});

var Insect = mongoose.model('Insect', InsectSchema);

module.exports = Insect;


