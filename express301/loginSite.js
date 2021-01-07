const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const port = 3000;

// Security Policy
app.use(helmet());

// To Serve Public Files
app.use(express.static('public'));

// Parse json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.param('storyId',(req, res, next, storyId) => {
    console.log(storyId);
    next();
});
// for all -- Middleware
app.use((req,res, next)=>{

    if(req.query.status === "failed"){
        res.locals.message = "Invalid Username Or Password";
    }
    else{
        res.locals.message = "";
    }
    next();
});

// Logout
app.get('/logout', (req, res, next) => {
    res.clearCookie('username');
    res.redirect('/login');
});

// Get Bank Statement
app.get('/statement', (req, res, next) => {
    //console.log(path.join(__dirname,'BankSatement'));
    //res.sendFile(path.join(__dirname,'userstatement/BankStatementChequing.png'));
    res.download(path.join(__dirname,'userstatement/BankStatementChequing.png'), 'ManishAccountStatement.png', (error) => {
        
        // if there is an error in sending the file , header may already be sent
        if(error){
            // res.headersSent is a boolean , true if already sent 
            if(! res.headersSent )
                res.redirect('/download/error');

        }

    });
    //res.download(path.join(__dirname,'userstatement/BankStatementChequing.png'));
    
    /*res.set('Content-Disposition','attachment');
    res.sendFile(path.join(__dirname,'userstatement/BankStatementChequing.png'));*/


});

app.get('/login', ( req, res, next ) => {
    console.log(req.query);
    const messageIfAny = req.query.message;
    res.render("login",{messageIfAny:messageIfAny});
});

app.get('/welcome', ( req, res, next ) => {
    console.log(" Cookie Value "+req.cookies.username);
    res.render("welcome",{username:req.cookies.username});
});


// in a route, anytime something has a : in front of it is a wildcard!
// wildcard, will match anything in that slot.

app.get('/story/:storyId', ( req, res, next) => {

    res.send(`<h2> Story ${req.params.storyId} </h2>`);
});

app.get('/story/:storyId/:link', ( req, res, next) => {

    res.send(`<h2> Story ${req.params.storyId} -- ${req.params.link}</h2>`);
});

app.post('/process_login', (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;

    if ( password === "helloworld@27"){
        res.cookie('username',username);
        res.redirect('/welcome');
    }
    else{
        res.redirect('/login?status=failed&message=Login Unsuccessful');
    }

});

app.get('/', ( req, res, next ) => {
    res.send("<h1>Express 301 Home Page!");
});

app.listen(port);