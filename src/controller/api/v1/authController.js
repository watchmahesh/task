
const _ = require("lodash");
const { responseFormat } = require("../../../format/ResponseFormat");

const { Config } = require("../../../models");
let { apiUserService } = require("../../../services");
const { singleErrorFormat } = require("../../../errors/singleErrorFormat");
const { transformRegister } = require("../../../transformer/authTransformer");
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
};

module.exports = authController;
