const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const kristyBase64 = require('./public/images/kristi');

const port = 3000;

// Security Policy
app.use(helmet());

// Parse json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/', ( req, res, next ) => {
  // The Data, in the 2nd argument will be appended into res.locals
  res.locals.validated = true;
  res.render("index", {
      msg : 'Hi There, I am coming from Rendering.js',
      html: '<div><img height="100" width="150" src="'+kristyBase64.getKristyBase64()+'"  ></div>'
      }
  );
});

app.listen(port);