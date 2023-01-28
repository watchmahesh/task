let constants = require('../constants/index');

exports.singleErrorFormat = (error) => {
    let o = {};
    let meta = {
        copyright: constants.COPYRIGHT,
        email: constants.COPYRIGHTEMAIL,
        api: {
            version: constants.VERSION
        }
    };

    let newError = {
        title: error.msg,
        detail:  error.msg,
        source:"pointer\":\"/data/attributes/"+error.param,
        code:error.param
    };
    o.errors = [newError];
    o.meta = meta;
    return JSON.stringify(o);
};
