/**
 * Created by dilunika on 10/02/18.
 */

class User {


    constructor(
        id,
        email = '',
        firstName = '',
        lastName = '',
        profilePicture = '',
        designation = ''
    ) {

        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
        this.designation = designation;
        this.userCreateDate = undefined;
        this.userLastModifiedDate = undefined;
        this.status = undefined;
        this.additionalAttributes = [];
    }

}

module.exports = User;