
let { productService } = require("../../../services");
const { singleErrorFormat } = require("../../../errors/singleErrorFormat");
const { transformProductDetail,transformProducts } = require("../../../transformer/productTransformer");
const {mkDirByPathSync ,uploadFile } = require('../../../helpers/fileHelper');
const { responseFormat } = require("../../../format/ResponseFormat");

let productController = {
    create: async (req, res) => {
      try {
  
        let productData = {
          'title': req.body.title,
          'description': req.body.description,
          'price': req.body.price,
          'category_id': req.body.category_id,
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
         const data = await productService.add(productData);
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

    getProductByCategoryId:async(req,res)=>{
      const filterQuery = await buildFilterQuery(req);
      let query = {
          where: filterQuery,
      };
    const products = await productService.findAll(query);
    return res.status(200).send(responseFormat(transformProducts(products)));

    }

  };

  module.exports = productController;


const buildFilterQuery = (req) => {
  let filter = {};
  const { query } = req;
  if (!query) {return filter;}
  if (query.category_id) {
    filter.category_id = query.category_id;
  }
 
  return filter;
};