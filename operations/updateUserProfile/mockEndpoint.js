/**
 * Created by dilunika on 10/02/18.
 */

module.exports = (params) => {

    console.log('updateUserProfile mock endpoint received params ', JSON.stringify(params));

    return new Promise((resolve) => {

        const data = {
            body: {}
        };
        setTimeout(() => resolve(data), 300);
    });
};