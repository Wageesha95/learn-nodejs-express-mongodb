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

dishRouter.route('/:dishId')

.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader=('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end('Will send dish :' + req.params.dishId + ' details to you.');
})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /dishes/' +req.params.dishId)
})

.put((req,res,next)=>{
    res.write('Updating the dish : '+req.params.dishId);
    res.end('\nWill update the dish : ' + req.body.name + 
    ' with details : ' +req.body.description );
})

.delete((req,res,next)=>{
    res.end('Will delete dish : '+req.params.dishId)
});


module.exports = dishRouter;