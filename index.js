var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Idfacebook = require('./models/idfacebook');//TODO: IdFacebok
var app = express();

mongoose.connect('mongodb://admin:admin@ds127783.mlab.com:27783/android9-diphuot'
,{ useMongoClient: true});

// var idfacebook = new Idfacebook({
//   userid: "1359582900828322",
//   image: "https://cdn3.ivivu.com/2014/10/Du-lich-vung-tau-cam-nang-tu-a-den-z-iVIVU.com-12.jpg",
//   username: "Trọng Phương",
//   timeupload: "1/1/2017",
//   destination: "Vũng Tàu",
//   content: "Vũng Tàu là thành phố thuộc tỉnh Bà Rịa - Vũng Tàu, ở vùng Đông Nam Bộ Việt Nam. Đây là trung tâm kinh tế, tài chính, văn hóa, du lịch, giao thông - vận tải và giáo dục và là một trong những trung tâm kinh tế của vùng Đông Nam Bộ. Sở hữu nhiều bãi biển đẹp và cơ sở hạ tầng được đầu tư hoàn chỉnh, Vũng Tàu là một địa điểm du lịch nổi tiếng tại miền Nam. Ngoài ra, thành phố còn là khu vực hậu cần của ngành công nghiệp dầu khí Việt Nam.",
//   like: 12,
//  comment : { name: "phương", sentence: "wow"}
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
  var userid = body.userid;
  var image = body.image;
  var username = body.username;
  var timeupload = body.timeupload;
  var destination = body.destination;
  var content = body.content;
  var like = body.like;

  var idfacebook = new Idfacebook({
    userid:userid,
    image: image,
    username: username,
    timeupload: timeupload,
    destination: destination,
    content: content,
    like: like,
  });



 idfacebook.save(function(err, idfacebook){
   if(err){
     res.json({ message:'Could not add record'+err});
   } else {
     res.json({ message:'done'});
   }
 });
});

app.put('/api/diphuot',function(req,res){
  var body = req.body;
  var id = body.id;
  var like = body.like;
  Idfacebook.findById(id, function(err,idfacebook){
    if(err) return handleError(err);

    idfacebook.like = like;
    idfacebook.save(function(err, updatedIdfacebook){
      if(err) return handleError(err);
      res.json({message:'update like done'});
    });
  });
});

app.put('/api/comment',function(req,res){
  var body = req.body;
  var id = body.id;
  var comment = body.comment;
  Idfacebook.findByIdAndUpdate(id,{$push:{comment}}, function(err, idfacebook){
    if(err) return handleError(err);
    res.json({message:'comment done'});
  });
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
