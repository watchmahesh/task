const {apiUserService,tokenService,clientService } = require('../../services');
const customError = require('../../errors/customError');
const _ = require('lodash');
const { singleErrorFormat } = require('../../errors/singleErrorFormat');
var jwt = require("jsonwebtoken");

exports.userValidateMiddleware = async (req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            if(token==undefined){
                throw new customError({statusCode: 404, message: 'Invalid Token', title: 'user'});

            }
            let accessTokenSecret= process.env.ACCESS_TOKEN_PRIVATE_KEY

           jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.status(422).send(JSON.parse(singleErrorFormat({ "param": "error", "msg": err.message})));
                }
                req.apiUser = user;
                return next();

            });
        }


    } catch (err) {
        return next(err);
    }

};
