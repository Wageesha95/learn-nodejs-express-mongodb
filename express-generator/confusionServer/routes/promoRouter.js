const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');
const { response } = require('express');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());


promotionRouter.route('/')

    .get((req, res, next) => {
        Promotions.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => next(err))
            .catch((err) => next(err));

    })

    .post((req, res, next) => {
        Promotions.create(req.body)
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported /promotions ')
    })

    .delete((req, res, next) => {
        Promotions.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next)
    });

promotionRouter.route('/:promoId')

    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId)
    })

    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId,
            { $set: req.body },
            { new: true }
        ).then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err) => next(err))
            .catch((err) => next(err));

    })

    .delete((req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports = promotionRouter;