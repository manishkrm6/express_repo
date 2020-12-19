const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const kristyBase64 = require('./public/images/kristi');

const port = 3000;

// Security Policy
app.use(helmet());

// To Serve Public Files
app.use(express.static('public'));

// Parse json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

app.get('/about', ( req, res, next ) => {
  res.render("about",{});
});

app.get('/', ( req, res, next ) => {
  // The Data, in the 2nd argument will be appended into res.locals
  res.locals.validated = true;
  res.render("index", {
      msg : 'Hi There, Information Sent from pugPractise Express',
      msg2: 'Hi Message 2 is Just Like That :)',
      html: '<div><img height="100" width="150" src="'+kristyBase64.getKristyBase64()+'"  ></div>',
      countries: [
        {
            name: "India",
            capital: "New Delhi",
            isAsian: true,
        },
        {
            name: "Sri-Lanka",
            capital: "Columbo",
            isAsian: true,
        },
        {
            name: "England",
            capital: "London",
            isAsian: false
        }
      ]
    });
});

app.listen(port);