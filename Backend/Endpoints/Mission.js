var BigchainDB      = require('../BigchainDB/Interface.js')
var fetch 			= require('node-fetch');
var fs 				= require('fs');
var cors 			= require('cors')

// express
const express 		= require('express');
const bodyParser 	= require('body-parser');
const logger 		= require('morgan');
const app 			= express();

// printing
var chalk 			= require('chalk');

app.use(bodyParser.json())
app.use(cors())


app.post('/api/createMission', (req, res) => {
    return new Promise((resolve, reject) => {

    })
})

app.listen(6868, () => {
    console.log('Mission creation is a gogo')
})
