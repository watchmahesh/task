let constants = require('../constants/index');


// eslint-disable-next-line no-unused-vars
exports.errorFormat = (errors, type = null) => {
    let o = {}; // empty Object
    let newErrorData = [];
    for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
    
        let newError = {
            source:"pointer\":\"/data/attributes/"+error.param,
            code:error.param,
            title: error.msg,
            detail:  error.msg
        };

        newErrorData.push(
            newError
        );
    }
    let meta = {
        copyright: constants.COPYRIGHT,
        email: constants.COPYRIGHTEMAIL,
        api: {
            version: constants.VERSION
        }
    };
    o.meta = meta;
    o.errors = newErrorData;
    return JSON.stringify(o);
};
