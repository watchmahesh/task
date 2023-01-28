

module.exports = {

    transformRegister: (data) => {
        return transformRegisterData(data);

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

