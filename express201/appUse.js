const express = require('express');
const app = express();

function validateUser( req, res, next ){
    res.locals.validated = true;
    next();
}

app.use('/admin',validateUser);

app.get('/', (req,res) => {
    res.send('<h1> Main Page </h1>');
    console.log(' Vaidation Run '+ res.locals.validated );
});

app.get('/admin', (req,res) => {
    res.send('<h1> Admin Panel </h1>');
    console.log(" Vaidation Run " + res.locals.validated );
});


app.listen(3000);
