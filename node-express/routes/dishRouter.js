const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.all((req,res,next) =>{
    res.statusCode=200;
    res.setHeader('content-Type','text/plan');
    next();
})

.get((req,res,next)=>{
    res.end('Will send all dishes to you')
})

.post((req,res,next)=>{
    res.end('Will add the dish: '+req.body.name+
            ' with details: '+req.body.description);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported yet')
})

.delete((req,res,next)=>{
    res.end('Deleting all dishes')
});

module.exports = dishRouter;
