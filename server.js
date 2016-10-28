var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'srrkrish',
    database: 'srrkrish',
    host: 'localhost',
    port: '5432',
    password: process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));

function createTemplate (data) {
   var title = data.title;
   var date = data.date;
   var heading = data.heading;
   var content = data.content;
   var content1 = data.content1;
   var content2 = data.content2;
   var content3 = data.content3;
   
   var htmlTemplate = `
   <html>
     <head>
        <title>
           ${title}
        </title>
        <meta name=".viewport" content="width-device-width, initial-scale=1"/>
        <link href="ui/style.css" rel="stylesheet" />
     </head>
	 <body bgColor="#FFFACF" leftMargin="0" topMargin="0" rightMargin="0" marginheight="0" marginwidth="0">
     <div class="container">
        <div>
			<a href="/">Home</a>
	   </div>
	   <hr/>
	   <h3>
        <div class="container5">
   	      ${heading}
	   </div>
	   </h3>
	   <div class="container2">
	      ${date.toDateString()}
	   </div>
	   <div class="container5">
	      ${content}
	   </div>
    </div>
    </body>
   </html>
   `;
   return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res){
    pool.query('SELECT * FROM article', function (err, result) {
       if (err){ 
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

var counter = 0;
app.get('/counter', function (req, res) {
	counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
	var name = req.query.name;
	names.push(name);
	res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
        pool.query("SELECT * FROM article where title = 'article-one'",  function (err, result) {
        if (err){ 
           res.status(500).send(err.toString());
        } else {
          if (result.rows.length === 0){
              res.status(404).send('Article Not found');
          } else {
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
          }
        });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/myphoto.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'myphoto.jpg'));
});

app.get('/ui/rose1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rose1.jpg'));
});

app.get('/ui/rose2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rose2.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
