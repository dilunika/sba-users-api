/**
 * Created by dilunika on 10/02/18.
 */
const uuid = require('uuid');

module.exports = (params) => {

    console.log('search user profile mock endpoint received params ', JSON.stringify(params));

    return new Promise((resolve) => {

        const data = {
            Users: [
                {
                    Username: uuid(),
                    UserCreateDate: new Date(),
                    UserLastModifiedDate: new Date(),
                    UserStatus: 'CONFIRMED',
                    UserAttributes: [
                        {Name: 'given_name', Value: 'John'},
                        {Name: 'family_name', Value: 'Doe'},
                        {Name: 'email', Value: 'john@y.com'},
                        {Name: 'profilePictureUrl', Value: 'http://lorempixel.com/100/100/'},
                        {Name: 'designation', Value: 'Scrum Master'},
                    ]

                }
            ]
        };
        setTimeout(() => resolve(data), 300);
    });
};