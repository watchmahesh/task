
const _ = require("lodash");
var jwt = require("jsonwebtoken");
const { responseFormat } = require("../../../format/ResponseFormat");
let CONSTANT = require('../../../constants/index');
let { apiUserService } = require("../../../services");
const { singleErrorFormat } = require("../../../errors/singleErrorFormat");
const { transformRegister,transformLogin, transformUser } = require("../../../transformer/authTransformer");
const dotenv = require('dotenv');
dotenv.config();
let authController = {
  registerUser: async (req, res) => {
    try {
    let user = await apiUserService.findOne({email: req.body.email});
    if(user){
      return res.status(404).send({"status":"error", "message":"User not found."});
    }
      let userData = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'username': req.body.username,
        'status': 'inactive',
        'password_method': 'is_password',
        'created_at': new Date(),
        'password': req.body.password,
      };
       await apiUserService.add(userData);
      return res.status(200).send(responseFormat(transformRegister(req.body.email)));
    } catch (err) {
      return res.status(422).send(
        JSON.parse(
          singleErrorFormat({
            param: "error",
            msg: "Something went wrong",
          })
        )
      );
    }
  },

  login: async (req, res) => {
    try {
      let requestData = req.body;
      if (requestData.grant_type == "refresh_token") {
        return refresToken(res, requestData);
      } else {
        let user = await apiUserService.findOne({email: req.body.email});


        if (user) {
          let tokenDetails= await generateTokens(user);
          let tokenData = {
            access_token: tokenDetails.access_token,
            access_token_expiry: tokenDetails.access_token_expiry,
            refresh_token: tokenDetails.refresh_token,
            refresh_token_expiry: tokenDetails.refresh_token_expiry,
            user_id: user.id,
          };

          return res
            .status(200)
            .send(responseFormat(transformLogin(tokenData)));
        } else {
          return res
            .status(422)
            .send(
              JSON.parse(
                singleErrorFormat({
                  msg: CONSTANT.USERNAMEPASSWORDINCORRECT,
                  param: "user",
                })
              )
            );
        }
      }
    } catch (e) {
      return res.status(422).send( JSON.parse(singleErrorFormat({msg: CONSTANT.USERNAMEPASSWORDINCORRECT,param: "user",
            })
          )
        );
    }
  },

  getMyProfile: async (req, res) => {
    try {
        let profile = await apiUserService.findOne({ email: req.apiUser.email});
        if (profile) {
            return res.status(200).send(responseFormat(transformUser(profile)));
        } else {
            return res.status(422).send(JSON.parse(singleErrorFormat({ "param": "error", "msg": "something went wrong" })));
        }
    } catch (err) {
        return res.status(422).send(JSON.parse(singleErrorFormat({ "param": "error", "msg": "something went wrong" })));
    }
  },
  logout: async (req, res) => {
    try {
      let bearerToken = req.headers['authorization'];
      if (bearerToken) {
          let token = bearerToken.split(" ")[1];
          await jwt.destroy(token);
      }
      return res.status(200).json({status: "success", message: 'Logged out successfully'});
    } catch (err) {
        return res.status(422).send(JSON.parse(singleErrorFormat({ "param": "error", "msg": "something went wrong" })));
    }
  },

};

module.exports = authController;

const generateTokens = async (user) => {
  try {
    const tokenDetails={};
      const payload = {id: user.id,email:user.email};
      const accessToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn:  process.env.ACCESS_TOKEN_EXPIRY_TIME}
      );
      const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_PRIVATE_KEY,
          { expiresIn:  process.env.REFRESH_TOKEN_EXPIRY_TIME}
      );
      tokenDetails["access_token"] = accessToken;
      tokenDetails["refresh_token"] = refreshToken;
      tokenDetails['access_token_expiry']=  process.env.ACCESS_TOKEN_EXPIRY_TIME,
      tokenDetails['refresh_token_expiry']=  process.env.REFRESH_TOKEN_EXPIRY_TIME;
      return tokenDetails;
  } catch (err) {
      return Promise.reject(err);
  }
};

const refresToken =async(res,requestBody)=>{
  if (requestBody.refresh_token) {
    let refreshTokenSecret= process.env.REFRESH_TOKEN_PRIVATE_KEY
    try{
    let isVerified = await jwt.verify(requestBody.refresh_token, refreshTokenSecret);
      if (isVerified) {
        let tokenDetails= await generateTokens(isVerified);
        let tokenData = {
          access_token: tokenDetails.access_token,
          access_token_expiry: tokenDetails.access_token_expiry,
          refresh_token: tokenDetails.refresh_token,
          refresh_token_expiry:tokenDetails.refresh_token_expiry,
        };
        return res.status(200).send(responseFormat(transformLogin(tokenData)));

      } else {
          return  res.status(401).send(JSON.parse(singleErrorFormat({ "msg": CONSTANT.INVALIDREFRESHTOKEN,"param": "user"})));
      }
    }catch(err){
      return  res.status(401).send(JSON.parse(singleErrorFormat({ "msg": err.message,"param": "user"})));
    }
  } else {
    return  res.status(401).send(JSON.parse(singleErrorFormat({ "msg": CONSTANT.INVALIDREFRESHTOKEN,"param": "user"})));
}
};
