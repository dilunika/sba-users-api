/**
 * Created by dilunika on 10/02/18.
 */

class ErrorResponseBody {


    constructor(code, description){

        this._code = code;
        this._description = description;
    }

    get code() {
        return this._code;
    }

    get description() {
        return this._description;
    }

}

module.exports = ErrorResponseBody;