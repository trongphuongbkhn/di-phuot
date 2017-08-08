var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var idfacebookSchema = new Schema({
    base64image : String,
    username : String,
    day : Number,
    month:Number,
    year:Number,
    content : String
});

var idfacebookModel = mongoose.model("idfacebook", idfacebookSchema);

module.exports = idfacebookModel;
