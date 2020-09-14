const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const authenticate = require('../authenticate');
const cors = require('./cors');
const  Favourites = require('../models/favourite');

const favouriteRouter = express.Router();

favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 200;
    res.end('Works fine')
})
.post(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {

    })
.put(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {

    })
.delete(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {

});

favouriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {

})
.post(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {

    })
.put(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {

    })
.delete(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {

});

module.exports = favouriteRouter;

