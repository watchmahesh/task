
let { productService } = require("../../../services");
const { singleErrorFormat } = require("../../../errors/singleErrorFormat");
const { transformProductDetail } = require("../../../transformer/productTransformer");
const {mkDirByPathSync ,uploadFile } = require('../../../helpers/fileHelper');
const { responseFormat } = require("../../../format/ResponseFormat");

let productController = {
    create: async (req, res) => {
      try {
  
        let productData = {
          'title': req.body.title,
        };
        if (req.files) {
            let rootDir = 'public';
            let absDir = '/uploads/product/';
            let dir = rootDir+absDir;
            mkDirByPathSync(dir);
            imageName = await uploadFile(
                req.files.image,
                dir
            );
            productData['image']= absDir+imageName
        }
         const data=await productService.add(productData);
        return res.status(200).send(responseFormat(transformProductDetail(data)));
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

  };

  module.exports = productController;