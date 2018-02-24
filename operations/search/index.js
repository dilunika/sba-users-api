const ErrorResponseBody = require('../../models/errorResponseBody');
const mock = require('./mockEndpoint');
const aws = require('./awsEndpoint');
const invokeApi = require('../../utils/invokeApi');
const mapper = require('../../models/mappers');

module.exports = (req, res) => {


    const firstNameKey = req.query.firstName;

    if(!firstNameKey || firstNameKey === '') {
        userNotFound(res,firstNameKey);
        return;
    }

    searchUsersByFirstName(firstNameKey)
        .then(r => mapResultsToUserList(r))
        .then(users => sendResponse(res, firstNameKey, users))
        .catch(err => {
            const message = 'Failed to search user for first name due to server error.' ;
            console.error(err, message);
            const errResponse = new ErrorResponseBody('FAILED_USER_SEARCH', message);
            res.status(500).json(errResponse);
        });
};

function userNotFound(res, firstNameKey) {

    const message = 'Unable to find user for given first name : ' + firstNameKey;
    console.warn(message);
    const errResponse = new ErrorResponseBody('USER_NOT_FOUND', message);
    res.status(404).json(errResponse);
}

function searchUsersByFirstName(firstName) {


    const params = {
        AttributesToGet : ['given_name', 'family_name', 'email', 'custom:profilePictureUrl', 'custom:designation'],
        Filter: 'given_name ^= "' + firstName + '"',
        Limit: 15
    };


    return invokeApi(params, aws, mock);

}

function sendResponse(res, firstNameKey, users) {

    if(users && users.length > 0) {
        res.status(200).json(users)
    } else {
        userNotFound(res,firstNameKey);
    }
}



function mapResultsToUserList(result) {

    console.log('User search results : ', JSON.stringify(result));
    const profiles = result.Users;

    if(profiles && profiles.length > 0) {
        return profiles.map(p => mapper.mapAttributesToUser(p));
    } else {
        return [];
    }

}