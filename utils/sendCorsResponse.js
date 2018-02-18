/**
 * Created by dilunika on 18/02/18.
 */

module.exports = (res, statusCode, body) => {

    res.set({
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    });

    res.status(statusCode).json(body);
};