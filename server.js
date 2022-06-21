const http = require('http'); //load http dependency
const fs = require('fs'); //load filesystem dependency
const PORT = 8080; //set local port

http.createServer(function (request, response) { //initate http server
    let url = request.url; //get url from request
    let page = `index` //set index page
    if (url != '/') {
        page = url.replace(/[^\w\s]/gi, '') //removes unsafe characters
        if (page == 'home') {
            page = `index` //set index page from /home route
        }
    }
    if (page.length >= 1) {
        let pageUrl = `./views/${page}.html` //set filesystem from route variable
        fs.readFile(pageUrl, function (err, html) { //set filesystem from route
            if (err) {
                response.writeHead(404);
                response.end(`Page not found`);
            } else {
                response.writeHeader(200, {
                    "Content-Type": "text/html"
                })
                response.write(html)
            }
            response.end()
        })
    } else {
        response.writeHead(404);
        response.end(`Page not found`);
    }
}).listen(PORT) //listen to port