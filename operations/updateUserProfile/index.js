/**
 * Created by dilunika on 18/01/18.
 */

const conf = require('../../config');
const User = require('../../models/user');
const ErrorResponseBody = require('../../models/errorResponseBody');
const mock = require('./mockEndpoint');
const aws = require('./awsEndpoint');
const mapper = require('../../models/mappers');


module.exports = (req, res) => {

    const userId = req.params.userId;
    const {email, firstName, lastName, profilePicture, designation} = req.body;
    const user = new User(userId, email, firstName, lastName, profilePicture, designation);

    update(user)
        .then(r => res.status(204).json({}))
        .catch(err => {
            const message = 'Failed to update the user attributes. ';
            console.error(message, err);
            const errResponse = new ErrorResponseBody('FAILED_USER_UPDATE', message);
            res.status(204).json(errResponse);
        });

};

function update(user) {

    const IS_OFFLINE = process.env.IS_OFFLINE;

    const attributes = mapper.mapUserToAttributes(user);

    const apiInvocation = IS_OFFLINE ? mock : aws;

    const params = {
        UserPoolId : conf.userPoolId,
        Username : user.id,
        UserAttributes: attributes
    };

    return apiInvocation(params);

}

