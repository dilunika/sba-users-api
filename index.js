/**
 * Created by dilunika on 18/01/18.
 */

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const createUser = require('./operations/createUser/index');

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.post('/users', createUser);


module.exports.handler = serverless(app);