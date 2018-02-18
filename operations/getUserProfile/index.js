/**
 * Created by dilunika on 18/01/18.
 */

const conf = require('../../config');
const User = require('../../models/user');
const ErrorResponseBody = require('../../models/errorResponseBody');
const mock = require('./mockEndpoint');
const aws = require('./awsEndpoint');


module.exports = (req, res) => {

    const userId = req.params.userId;

    findUserByName(userId)
        .then(profile => mapAttributesToUser(profile))
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

function mapAttributesToUser(profile) {

    const user = new User(profile.Username);
    user.userCreateDate = profile.UserCreateDate;
    user.userLastModifiedDate = profile.UserLastModifiedDate;
    user.status = profile.UserStatus;
    user.firstName = getValueOfAttribute(profile, 'given_name');
    user.lastName = getValueOfAttribute(profile, 'family_name');
    user.email = getValueOfAttribute(profile, 'email');
    user.profilePicture = getValueOfAttribute(profile, 'custom:profilePictureUrl');
    user.designation = getValueOfAttribute(profile, 'custom:designation');

    return user;
}

function getValueOfAttribute(profile, attributeName) {

    const attr = profile.UserAttributes.find(a => a.Name === attributeName);

    return attr ? attr.Value : undefined;
}