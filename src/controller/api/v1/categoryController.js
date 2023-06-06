
let { categoryService } = require("../../../services");
const { singleErrorFormat } = require("../../../errors/singleErrorFormat");
const { transformCategory,transformCategories } = require("../../../transformer/categoryTransformer");
const { responseFormat } = require("../../../format/ResponseFormat");

let categoryController = {
  create: async (req, res) => {
    try {
      let requestData = {
        'title': req.body.title,
      };
      const data = await categoryService.add(requestData);
      return res.status(200).send(responseFormat(transformCategory(data)));
    } catch (err) {
      console.log(err)
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

  index: async (req, res, next) => {
    try {
      const datas = await categoryService.findAll(req);
      return res.status(200).send(responseFormat(transformCategories(datas)));
    } catch (error) {
      return handleControllerError(res, error);
    }
  },



};

module.exports = categoryController;