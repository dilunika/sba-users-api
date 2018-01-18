/**
 * Created by dilunika on 18/01/18.
 */
const shortId = require('shortid');
const save = require('./save');


module.exports = (req, res) => {

    const {email, firstName, lastName, password} = req.body;
    const userData = {
        userId: shortId.generate(),
        email,
        firstName,
        lastName,
        password
    };

    return save(userData)
        .then(r => res.status(r.status).json(r.body));

};