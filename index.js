var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Idfacebook = require('./models/idfacebook');//TODO: IdFacebok
var app = express();

mongoose.connect('mongodb://admin:admin@ds127783.mlab.com:27783/android9-diphuot'
,{ useMongoClient: true});

// var idfacebook = new Idfacebook({
//   id: 5,
//   name: "Hội An",
//   link: "https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg"
// });

// idfacebook.save();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// app.post('/api/diphuot', function(req,res){
//   var body = req.body;
//   res.json(body);
// });

app.get('/api/diphuot', function(req,res){
  Idfacebook.find(function(err, idfacebook){
    if(err){
      res.json({success:0, message:'Could not get data'});
    } else {
      res.json(idfacebook);
    }
  });
});

app.post('/api/diphuot', function(req,res){
  var body = req.body;
  var base64image = body.base64image;
  var username = body.username;
  var day = body.day;
  var month = body.month;
  var year = body.year;
  var content = body.content;

  var idfacebook = new Idfacebook({
    base64image: base64image,
    username: username,
    day: day,
    month: month,
    year: year,
    content: content
  });


 idfacebook.save(function(err, idfacebook){
   if(err){
     res.json({ message:'Could not add record'+err});
   } else {
     res.json({ message:'done'});
   }
 });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
