var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var idfacebookSchema = new Schema({
  id: Number
});

var idfacebookModel = mongoose.model("idfacebook", idfacebookSchema);

module.exports = idfacebookModel;
