const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 3000;

app.use(helmet());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/ajax',(req,res) => {
    
    console.log(req);
    //res.send("<h1>Test</h1>");
    res.json({name:req.body.name});
    
});


app.listen(port);