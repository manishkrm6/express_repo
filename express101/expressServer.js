const express = require('express');
const path = require('path');

//console.log(express);
// An "app" is the express object  (createApplication inside the Express Module)
const app = express();

app.use(express.static('public'));

app.all('/', (req,res) => {
    
   // console.log("Hi "+path.join());
    //console.log(__dirname);

    console.log(path.join(__dirname + '/node.html'));
    res.sendFile(path.join(__dirname + '/node.html'));
    //res.send('<h1> This is the Express Home Page!</h1>');

});

app.all('*',(req,res) => {

    res.send('<h1>Sorry! Invalid Page!</h1>');
});

app.listen(3001);
console.log("The Server is listening on Port 3001");