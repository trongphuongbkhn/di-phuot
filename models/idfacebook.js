var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var idfacebookSchema = new Schema({
    userid : String,
    image : String,
    username : String,
    timeupload : String,
    destination: String,
    content : String,
    like: Number
});

var idfacebookModel = mongoose.model("idfacebook", idfacebookSchema);

module.exports = idfacebookModel;
