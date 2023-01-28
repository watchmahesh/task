
const _ = require("lodash");
const Sequelize = require('sequelize');
var jwt = require("jsonwebtoken");

const { responseFormat } = require("../../../format/ResponseFormat");
let CONSTANT = require('../../../constants/index');

const { Config } = require("../../../models");
let { apiUserService } = require("../../../services");
const { singleErrorFormat } = require("../../../errors/singleErrorFormat");
const { transformRegister,transformLogin, transformUser } = require("../../../transformer/authTransformer");
let authController = {
  registerUser: async (req, res) => {
    let user = await apiUserService.findOne({
      where: { email: req.body.email },
    });
    try {
      let userData = {
        email: req.body.email,
        password: await apiUserService.bycrptPassword(req.body.password),
        status: true,
        username: req.body.username,
        createdAt: Date.now(),
      };
      user = await apiUserService.add(userData);
      return res
        .status(200)
        .send(responseFormat(transformRegister(req.body.email)));
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
        let user = await apiUserService.findOneWithpass({
          where: Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("email")),
            Sequelize.fn("lower", req.body.email)
          ),
        });

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
      console.log(e);
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
  },

  getMyProfile: async (req, res) => {
    try {

        let profile = await apiUserService.findOneProfile({where: {id: req.apiUser.id}});
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
