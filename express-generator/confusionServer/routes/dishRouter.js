const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');
const { response } = require('express');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')

    // .all((req,res,next) =>{
    //     res.statusCode=200;
    //     res.setHeader('content-Type','text/plan');
    //     next();
    // })

    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));

    })

    .post((req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log('Dish Created', dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported yet')
    })

    .delete((req, res, next) => {
        Dishes.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next)
    });

dishRouter.route('/:dishId')

    // .all((req, res, next) => {
    //     res.statusCode = 200;
    //     res.setHeader = ('Content-Type', 'text/plain');
    //     next();
    //     })

    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId)
    })

    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId,
            { $set: req.body },
            { new: true }
        ).then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
            .catch((err) => next(err));

    })

    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = dishRouter;