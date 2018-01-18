/**
 * Created by dilunika on 18/01/18.
 */

const AWS = require('aws-sdk');

module.exports = () => {

    const IS_OFFLINE = process.env.IS_OFFLINE;
    let dynamoDb;
    if (IS_OFFLINE === 'true') {
        dynamoDb = new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        });
        console.log(dynamoDb);
    } else {
        dynamoDb = new AWS.DynamoDB.DocumentClient();
    }

    return dynamoDb;
};