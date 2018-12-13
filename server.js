const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to our amazing website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Ooops something went wrong!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
