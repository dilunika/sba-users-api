/**
 * Created by dilunika on 18/01/18.
 */

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const updateUserProfile = require('./operations/updateUserProfile/index');
const getUserProfile = require('./operations/getUserProfile/index');

app.use(bodyParser.json({ strict: false }));

app.get('/users/ping', function (req, res) {
    res.send('Users API is up and running!!!')
});

app.get('/users/:userId', getUserProfile);

app.put('/users/:userId', updateUserProfile);


module.exports.handler = serverless(app);