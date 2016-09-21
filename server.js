var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles ={
   'article-one': {
		title: 'Article One | Radhakrishnan',
		heading: 'Article one',
		date: 'Sep 5, 2016',
		content: `
		<h1>Personal</h1>
		<p>I am Radhakrishnan, retired Bank officer, interested in studying computer languages</p>
		<h1>Professional</h1>
		<p>Retired from State Bank of Travancore, worked in the following Branch/Departments recent past</p>
		<ol>
		<li>Akkulam Branch as Branch Manager</li>
		<li> Head office, KYC Cell, as Chief Manager</li>
        <li> Head office, CDC, Belapur , as Chief Manager</li>
		</ol>
		`
		},

	'article-two': {
		title: 'Article Two | Radhakrishnan',
		heading: 'Article Two',
		date: 'Sep 10, 2016',
		content: `
			<div class="center">
           <img src="/ui/myphoto.jpg" class="img-medium"/>
			</div>
		<h1>Personal</h1>
		<p>I am Radhakrishnan, retired Bank officer, married with Vasanthi on 27/05/1982</p>
		<h1>Professional</h1>
		<p>Retired from State Bank of Travancore </p>
		`
	},

	'article-three': {
		title: 'Article Three | Radhakrishnan',
		heading: 'Article Three',
		date: 'Sep 15, 2016',
		content: `
		<h1>Personal</h1>
		<p>I am Radhakrishnan, retired Bank officer</p>
		<h1>Professional</h1>
		<p>Retired from State Bank of Travancore, worked in the various Branch/Departments recent past</p>
	`
	}
};
function createTemplate (data) {
   var title = data.title;
   var date = data.date;
   var heading = data.heading;
   var content = data.content;

   var htmlTemplate = `
   <html>
     <head>
        <title>
           ${title}
        </title>
        <meta name=".viewport" content="width-device-width, initial-scale=1"/>
        <link href="ui/style.css" rel="stylesheet" />
     </head>
     <body>
        <div class="container">
           <div>
	      <a href="/">Home</a>
	   </div>
	   <hr/>
	   <h3>
	      ${heading}
	   </h3>
	   <div>
	      ${date}
	   </div>
	   <div>
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/myphoto.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'myphoto.jpg'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/:articleName', function (req, res) {
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
