const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');

const port = 3000;

// Security Policy
app.use(helmet());

// To Serve Public Files
app.use(express.static('public'));

// Parse json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//console.log("Path is "+path.join(__dirname,'views'));

//app.set('view engine', 'ejs');
//app.set('view engine', 'hbs');
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

//console.log(path.join(__dirname,'views/admin'));


/*1. Create Express Object
  2. Define a View Engine

    EJS
    Mustache
    Handlebars
    Jade/Pug

  3. Inside One of our routes, we have a res.render
  4. We Pass in res.render two things
    - the file we wanna use
    - the data we wanna send to that file
  5. Express uses the node module for our specified view engine and parse the file.

  6. Final Result compiled product of the things the browser can render.apply */


app.get('/', ( req, res, next ) => {

    
    //res.send("Simple Testing");
    //res.json({"Message" : "This is a simple JSON Response Cheers!"});
    
    console.log("Hello");

   // res.render("index");

});



app.listen(port);

