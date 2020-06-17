const express = require('express');
const http = require('http');
const morgan=require('morgan');
const bodyParser=require('body-parser');

const dishRouter = require('./routes/dishRouter')

const hostname = 'localhost';
const port = 3000;

const app =express();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/dishes',dishRouter)



app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will send all dish :' + req.params.dishId + ' to you..')
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /dishes/' 
    +req.params.dishId)
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish : '+req.params.dishId);
    res.end('will update the dish : ' + req.body.name + 
    'with details : ' +req.body.description );
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Will delete dish : '+req.params.dishId)
});



app.use(express.static(__dirname+'/public'));


app.use((Request,Response,next) =>{
    Response.statusCode = 200;
    Response.setHeader('Content-Type','text/html');
    Response.end('<html><body><h1>This is an express server.</h1></body></html>')
});


const server = http.createServer(app);


server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});