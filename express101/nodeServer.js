const http = require('http');
const fs = require('fs');

const server = http.createServer( (req,res) => {
   
    console.log(req.url);

    if( req.url === '/'){
        
        const nodeHtml = fs.readFileSync('node.html');
        res.writeHead(200,{'content-type': 'text/html'});
        res.write(nodeHtml);
    }
    else if( req.url == '/node.png'){
        
        console.log(" Am i here");

        res.writeHead(200,{'content-type': 'image/png'});
        const image = fs.readFileSync('node.png');
        res.write(image);

    }
    else if( req.url == '/style.css'){
        
        res.writeHead(200,{'content-type': 'text/css'});
        const css = fs.readFileSync('style.css');
        res.write(css);

    }
    else{
        res.writeHead(404,{'content-type': 'text/html'});
        res.write('<h1>Error! Invalid Page!</h1>');
    }

    res.end();

});

server.listen(3000);