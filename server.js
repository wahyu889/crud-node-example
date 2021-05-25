const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(0, 20);
    console.log(num);

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    //basic routing
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about' :
            path += 'about.html';
            res.statusCode = 200;

            break;
        default:
            path += '404.html';
            res.statusCode = 404;

            break;
    }

    //send an html file
    fs.readFile('./views/index.html', (err, data) => {
        if(err){
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
});

server.listen(3000, 'localhost', () =>{
    console.log('listening port request on port 3000');
});