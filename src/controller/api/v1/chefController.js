
let { chefService } = require("../../../services");
const { singleErrorFormat } = require("../../../errors/singleErrorFormat");
const { transformChefDetail,transformChefs } = require("../../../transformer/chefTransformer");
const {mkDirByPathSync ,uploadFile } = require('../../../helpers/fileHelper');
const { responseFormat } = require("../../../format/ResponseFormat");

let chefController = {
    create: async (req, res) => {
      try {
        let requestData = {
          'name': req.body.name,
          'designation': req.body.designation,
          'facebook_link': req.body.facebook_link,
          'instagram_link': req.body.instagram_link,
          'twitter_link': req.body.twitter_link,
        };
        if (req.files) {
            let rootDir = 'public';
            let absDir = '/uploads/chef/';
            let dir = rootDir+absDir;
            mkDirByPathSync(dir);
            imageName = await uploadFile(
                req.files.image,
                dir
            );
            requestData['image']= absDir+imageName
        }
         const data = await chefService.add(requestData);
        return res.status(200).send(responseFormat(transformChefDetail(data)));
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

    index: async(req, res, fn) => {
        try {
            const filterQuery = await buildFilterQuery(req);
            let query = {
                where: filterQuery,
            };
            const data = await chefService.findAll(query);
            return res.status(200).send(responseFormat(transformChefs(data)));
        } catch (error) {
            console.log(error)
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

  module.exports = chefController;


const buildFilterQuery = (req) => {
  let filter = {};
  const { query } = req;
  if (!query) {return filter;}

  return filter;
};