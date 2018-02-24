/**
 * Created by dilunika on 10/02/18.
 */

module.exports = (params) => {

    console.log('getUserProfile mock endpoint received params ', JSON.stringify(params));

    return new Promise((resolve) => {

        const data = {
            Username: params.Username,
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
        };
        setTimeout(() => resolve(data), 300);
    });
};