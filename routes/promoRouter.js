const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promoRouter = express.Router(); //mini express app


promoRouter.use(bodyParser.json())

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions); //Will send all the data as a json format

    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Pormotion adding to the db');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res,next) => {
    res.statusCode = 403; //Operation not supported
    res.end('PUT operation not supported on /promotions');  
})
.delete((req,res,next) => {
    Promotions.remove({})
    .then((resp) => {
        console.log('Deleting data from db');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //to complete the middleware
})
.get((req,res,next) => {
    res.end('Will send deatails of the promo ' + req.params.promoId + ' to you!');
})
.post((req,res,next) => {
    res.statusCode = 403; //Operation not supported
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req,res,next) => {
    res.write('Updating the promo:'+ req.params.promoId + '\n')
    res.end('Will update the promo: '+ req.body.name + ' with details ' + req.body.description);

})
.delete((req,res,next) => {
    res.end('Deleting the promo: ' + req.params.promoId);
});


module.exports = promoRouter;


