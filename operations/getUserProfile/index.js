/**
 * Created by dilunika on 18/01/18.
 */

const conf = require('../../config');
const ErrorResponseBody = require('../../models/errorResponseBody');
const mock = require('./mockEndpoint');
const aws = require('./awsEndpoint');
const mapper = require('../../models/mappers');


module.exports = (req, res) => {

    const userId = req.params.userId;

    findUserByName(userId)
        .then(profile => mapper.mapAttributesToUser(profile))
        .then(user => res.status(200).json(user))
        .catch(err => {
            const message = 'Failed to fetch the user details. ';
            console.error(message, err);
            const errResponse = new ErrorResponseBody('FAILED_USER_FETCH', message);
            res.status(500).json(errResponse);
        });

};

function findUserByName(userId) {

    const IS_OFFLINE = process.env.IS_OFFLINE;

    const apiInvocation = IS_OFFLINE ? mock : aws;

    const params = {
        UserPoolId : conf.userPoolId,
        Username : userId
    };


    return apiInvocation(params);

}
