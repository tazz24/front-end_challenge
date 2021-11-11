const fs = require('fs');

const express = require('express');
const session=require('express-session');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
var cookieParser=require("cookie-parser");
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';

const app = express();

const port = 6789;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/public'));
app.use(session({ resave: false ,secret: '123456' , saveUninitialized: true, cookie: { secure: !true}}));
// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res
app.get('/', (req, res) => res.render('index'));
app.get('/index', (req, res) => res.render('index'));
//app.get('/books.html',(req,res)=> res.render('books'));
app.get('/books.html', async (req, res) => {	
	req.session.produse=[];
	await MongoClient.connect(url, async function(err, client) {
		var db = client.db('cumparaturi');
		await db.collection('produse').find().toArray(async function(err, doc) {
			if(doc!=undefined){
				req.session.produse=doc;
				res.render('books', { produse: req.session.produse});
			}
		});
		client.close();  	
		});
	});
app.get('/about.html',(req,res)=> res.render('about'));
app.get('/student_login.html',(req,res)=> res.render('student_login'));

app.post('/verificare',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.password);
    if(req.body.username=="razvan" && req.body.password=="abc")
    {
       
        res.redirect('/');
    }
    else{
        res.cookie('mesaj','Utilizator sau parola gresite', {expires: new Date(360000 + Date.now())})
        res.redirect('/student_login.html');
    }
   
   


    

});

app.get('/creareBD',(req,res)=>{
    MongoClient.connect(url, function(err, client) {
       
        var db = client.db('cumparaturi');
        console.log("Creare baza ");
        client.close();
    }); 
    res.redirect('http://localhost:6789/');
})

app.get('/inserareBD',(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        var db = client.db('cumparaturi');
        db.collection('produse').insertOne({
            Produs: "1",
            Nume:"Ursul pacalit de vulpe",
            Pret: "20 lei"
        });
        db.collection('produse').insertOne({
            Produs: "2",
            Nume:"Colt Alb",
            Pret: "15 lei"
        });
        db.collection('produse').insertOne({
            Produs: "3",
            Nume:"Amintiri din copilarie",
            Pret: "35 lei"
        });
        db.collection('produse').insertOne({
            Produs: "4",
            Nume:"Carti de colorat",
            Pret: "10 lei"
        });
        db.collection('produse').insertOne({
            Produs: "5",
            Nume:"Misterele lumii",
            Pret: "25 lei"
        });
        db.collection('produse').insertOne({
            Produs: "6",
            Nume:"Pacala",
            Pret: "20 lei"
        });
        console.log("Am ajuns in inserare");
        client.close();
        });
        res.redirect('http://localhost:6789/');
    }
);

app.get('/stergereBD',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cumparaturi");
        dbo.collection("produse").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            db.close();
          });
      });
})

app.get('/stergere_obiect',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cumparaturi");
        var myquery = { pret: '20 lei' };
        dbo.collection("produse").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
        });
      });
})



app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));