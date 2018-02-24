const conf = require('../config');

module.exports = (params, awsEndpoint, mockEndpoint) => {


    const IS_OFFLINE = process.env.IS_OFFLINE;

    const apiInvocation = IS_OFFLINE ? mockEndpoint : awsEndpoint;

    const allParams = Object.assign({}, params, {UserPoolId : conf.userPoolId,});

    return apiInvocation(allParams);
};