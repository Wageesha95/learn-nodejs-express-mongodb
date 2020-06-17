const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((Request,Response) =>
{
    console.log("Request for " + Request.url + "by method" +Request.method);

    if(Request.method == 'GET'){
        var fileUrl;
        if (Request.url == '/'){
        fileUrl = '/index.html';
        }else{
        fileUrl = Request.url;
        }

        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        
        if (fileExt=='.html'){

            fs.exists(filePath, (exists) => {
                if(!exists){
                    Response.statusCode = 404;
                    Response.setHeader('Content-Type','text/html');
                    Response.end('<html><body><h1>Error 404: ' +fileUrl+'</h1></body></html>')

                    return;
                }else{
                    Response.statusCode=200;
                    Response.setHeader('Content-Type','text/html');
                    fs.createReadStream(filePath).pipe(Response);

                }
            })

        }else{
            Response.statusCode=404;
            Response.setHeader('Content-Type','text/html');
            Response.end('<html><body><h1>Error 404: ' +fileUrl+' not a HTML file</h1></body></html>')

            return;
        }
    }else{
        Response.statusCode=404;
        Response.setHeader('Content-Type','text/html');
        Response.end('<html><body><h1>Error 404: ' +fileUrl+' Request method is not supported</h1></body></html>')

        return;
    }
   // Response.statusCode = 200;
   // Response.setHeader('Content-Type','text/html');
   // Response.end('<html><body><h1>Hello</h1></body></html>')
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});
