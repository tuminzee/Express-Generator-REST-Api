const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router(); //mini express app

dishRouter.use(bodyParser.json())

dishRouter.route('/')
.get((req,res,next) => {
    // res.end('Will send all the dishes to you!')
    Dishes.find({}) //handaling the request at a particular end point
    .then ((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes); //will take the parameter and send it as a json response   
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    //res.end('Will add the dish: ' + req.body.name + ' with details ' + req.body.description);
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish Created', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403; //Operation not supported
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next) => {
    // res.end('Deleting all the dishes!')
    Dishes.remove({})
    .then((resp) => {
        res.statusCodec= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')
.get((req,res,next) => {
    //res.end('Will send deatails of the dish ' + req.params.dishId + ' to you!');
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403; //Operation not supported
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res,next) => {
    // res.write('Updating the dish:'+ req.params.dishId + '\n')
    // res.end('Will update the dish: '+ req.body.name + ' with details ' + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body

    }, {new : true})
    .then((dish) => {
        console.log('Dish Updated', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    // res.end('Deleting the dish: ' + req.params.dishId);
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = dishRouter;


