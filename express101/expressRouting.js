const express = require('express');
const app = express();

/* app.all('/' , (req,res) => {
    console.log("Any Kind Of HTTP Verbs!");
    res.send('<h1> Welcome in Express JS! </h1>');
});*/

app.get('/', (req,res) => {
    
    console.log(req);
    
    res.send('<h1> Welcome in Express JS! Get Method </h1>');
}); 

app.post('/', (req,res) => {
    
    console.log(req);
    res.send('<h1> Welcome in Express JS! Post Method </h1>');

});







app.listen(3001);
