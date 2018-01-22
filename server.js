//FIRST WEB SERVE

//hi brow

const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;



hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

//app.use((req, res,next ) => {

//	res.render('maintenance.hbs');

//});

app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`

	console.log(log);

	fs.appendFile('server.log',log + '\n',(err) =>{
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});

	next(); // middleware has finished and the aplication will continue to run
    //if middleware doesnt comeback 
});



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//req argument: store headers bodyinfo method path
//res argument: methods to respond the http request (customize data and status code)

app.get('/', (req, res) =>{

	res.render('home.hbs', {
	pageTitle: '123 Home page', 
	welcomeMessage: 'Welcome to my website'
    });

});

app.get('/json', (req, res) =>{

	//res.send('<h1>Hello Express!</h1>');
	res.send({name: 'Lalo',
		      likes: ['programming','Learning new things']});
});


app.get('/about',(req, res) => {
	res.render('about.hbs', { 
	pageTitle: '123 About Page'
    });
	
});

app.get('/projects',(req, res) => {
	res.render('projects.hbs', { 
	pageTitle: 'Projects'
    });
	
});



app.get('/bad', (req, res) => {

	res.send({errorMessage: 'Unable to handle request'});

});



//Bind our application to a port of my machine
//for the port to start listening
app.listen(port, () => {console.log(`Server is up on port ${port}`)});

