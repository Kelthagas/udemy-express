const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Express is a functional framework at its base
// Things will run line by line
var app = express();

// If you want to watch other extensions on nodemon, add "$ ** -e js,hbs,etc"
hbs.registerPartials(__dirname + '/views/partials');
// This will set express keys to certain values
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next(); // Call this to end the middleware and get to the next area
});

// We can set this up to run maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// This is middleware
// Think of it as tweaking express to do something else
// __dirname ==> path to project file
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi from the server ;)'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
})

app.get('/bad', (req, res) => {
  res.send({
    status: "BAD",
    body: "Unable to fullfill your request"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port: 3000");
});
