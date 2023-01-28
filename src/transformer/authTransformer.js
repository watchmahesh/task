

module.exports = {

    transformRegister: (data) => {
        return transformRegisterData(data);

    },

    transformLogin: (tokenDetails) => {
        return transform(tokenDetails);
    },

    transformUser: (user) => {
        return transformProfileUser(user);
    },


};

const transformRegisterData = (data) => {
    let returnData = {
        'message': 'Register successfully',
        'detail': 'Register successfully',
        'email': data.email

    };
    return returnData;
};


const transform = (tokenDetails) => {
    let returnData = {
        'access_token': tokenDetails.access_token,
        'refresh_token': tokenDetails.refresh_token,
        'expires_in': tokenDetails.access_token_expiry,
        "token_type": "Bearer"
    };
    return returnData;
};

const transformProfileUser = (user) => {
    let returnData = {
        'id': user.id,
        'name': user.name ? user.name : null,
        'email': user.email,
        'username': user.username,

    };
    return returnData;
};

