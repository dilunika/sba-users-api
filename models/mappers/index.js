const User = require('../user');

module.exports = {

    mapAttributesToUser: (profile) => {

        const user = new User(profile.Username);
        user.userCreateDate = profile.UserCreateDate;
        user.userLastModifiedDate = profile.UserLastModifiedDate;
        user.status = profile.UserStatus;
        user.firstName = getValueOfAttribute(profile, 'given_name');
        user.lastName = getValueOfAttribute(profile, 'family_name');
        user.email = getValueOfAttribute(profile, 'email');
        user.profilePicture = getValueOfAttribute(profile, 'custom:profilePictureUrl');
        user.designation = getValueOfAttribute(profile, 'custom:designation');

        return user;
    }
};

function getValueOfAttribute(profile, attributeName) {

    // handle listUsers and adminGetUser API inconsistency.
    const attributes = profile.UserAttributes ? profile.UserAttributes : profile.Attributes;

    const attr = attributes ? attributes.find(a => a.Name === attributeName) : undefined;

    return attr ? attr.Value : undefined;
}