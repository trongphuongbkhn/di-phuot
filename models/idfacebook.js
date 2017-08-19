var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var idfacebookSchema = new Schema({
    userid : String,
    image : String,
    username : String,
    timeupload : String,
    destination: String,
    content : String,
    like: Number,
    comment: [{name: String, sentence: String}]
});


var idfacebookModel = mongoose.model("idfacebook", idfacebookSchema);

module.exports = idfacebookModel;
