const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = [
    'http://localhost:3000', 
    'https://localhost:3443'
]; //Specific whitelisted origin for the cors handling

var corsOptionsDelegate = (req, callback) => {
    var corsOptions;

    if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true };
    } else{
        corsOptions = {
            origin: false
        }
    }
    callback(null, corsOptions);
};


exports.cors = cors(); //for allowing all the general GET reqs
exports.corsWithOptions = cors(corsOptionsDelegate); //for origin specidifc reqs

