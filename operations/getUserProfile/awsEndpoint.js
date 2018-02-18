/**
 * Created by dilunika on 10/02/18.
 */

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports = (params) => {

    return new Promise((resolve, reject) => {

        cognito.adminGetUser(params, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
};