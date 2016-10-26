var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'srrkrish',
    database: 'srrkrish',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
    
var app = express();
app.use(morgan('combined'));

var articles ={
   'article-one': {
		title: 'Article One | Radhakrishnan',
		heading: 'Article one',
		date: 'Sep 25, 2016',
		content: `
		<h1>Personal</h1>`,
		content1:`
		<p>I am Radhakrishnan, retired Bank officer, interested in studying computer languages</p>`,
		content2:`
		<h1>Professional</h1>`,
		content3:`
		<p>Retired from State Bank of Travancore, worked in the following Branch/Departments recent past</p>
		<ol>
		<li>Akkulam Branch as Branch Manager</li>
		<li> Head office, KYC Cell, as Chief Manager</li>
        <li> Head office, CDC, Belapur , as Chief Manager</li>
		</ol>
		`
	}
};

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
		<TABLE height=40 cellSpacing=0 cellPadding=0 width="100%" border=0 style="border-collapse: collapse" bordercolor="#111111">
		<TBODY>
		<TR>
		<TD width=100 height=40>
		<P align=center>&nbsp; 
		<IMG id="me" src="/ui/myphoto.jpg" width="203" height="210"></P></TD>
		<TD width=355 height=40>
		<P align=center>&nbsp; 	   	   
	   <h3>
        <div class="container5">
   	      ${heading}
	   </div>
	   </h3>
	   <div class="container2">
	      ${date}
	   </div>
	   <div class="container5">
	      ${content}
	   </div>
	   <div class="container1">
	      ${content1}
	   </div>
	   <div class="container5">
	      ${content2}
	   </div>
	   <div class="container3">
	      ${content3}
	   </div>	
		</TD></TR></TBODY></TABLE>	   
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
app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM test', function (err, result) {
       if (err) {
           rec.status(500).send(err.toString());
       } else {
           rec.send(JSON.stringnify(result));
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

app.get('/:articleName', function (req, res) {
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
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

app.get('/ui/nice.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'nice.gif'));
});

app.get('/ui/rose2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rose2.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
