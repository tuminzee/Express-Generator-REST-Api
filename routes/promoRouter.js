const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router(); //mini express app

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //to complete the middleware
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!')
})
.post((req,res,next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403; //Operation not supported
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res,next) => {
    res.end('Deleting all the promotions!')
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


