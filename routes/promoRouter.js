const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');
const authenticate = require('../authenticate');

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
.post(authenticate.verifyUser, (req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Pormotion adding to the db');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put(authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403; //Operation not supported
    res.end('PUT operation not supported on /promotions');  
})
.delete(authenticate.verifyUser, (req,res,next) => {
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
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403; //Operation not supported
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put(authenticate.verifyUser, (req,res,next) => {
   Promotions.findByIdAndUpdate(req.params.promoId, {
       $set: req.body
   }, {new:true}) //new:true will return to 
   .then((promotion) => {
       console.log('Updated the data');
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        console.log(resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err)
    .catch((err) => next(err)))
});


module.exports = promoRouter;


