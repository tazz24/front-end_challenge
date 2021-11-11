var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';

MongoClient.connect(url, function(err, client) {
  var db = client.db('cumparaturi');
    var cursor = db.collection('produse').find();

    cursor.each(function(err, doc) {

        console.log(doc);

    });
}); 