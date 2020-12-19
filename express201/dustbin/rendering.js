const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

/* 1. Express as we know it happens. This File.
2. We define  a view engine.
- EJS.
- Mustache.
- Handlebars.
- Jade/Pug 

3. Inside one of our routes, we have res.render
4. We pass that res.render 2 things:
- the file we want to use.
- the data we want to send to that file.
5. Express uses the node module 
*/

//app.set('view engine','ejs');
//app.set('view engine','hbs');

app.set('view engine','pug');


app.set('views',path.join(__dirname,'views'));

app.get('/', (req,res,next) => {
    res.render("index");
});


app.listen(port);