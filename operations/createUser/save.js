/**
 * Created by dilunika on 18/01/18.
 */
const dynamoDb = require('../../utils/dynamoDb')();

const USERS_TABLE = process.env.USERS_TABLE;

module.exports = (userData) => {

    const params = {
        TableName: USERS_TABLE,
        Item: userData,
    };

    return new Promise((resolve) => {

        dynamoDb.put(params, (error) => {
            if (error) {
                console.log('Failed to save user in table.',error);

                resolve({
                    status: 500,
                    body: {error: 'Could not create user.'}
                });

            }
            const {userId, email, firstName, lastName} = userData;
            resolve({
                status: 201,
                body: {userId, email, firstName, lastName}
            });
        });
    });


};