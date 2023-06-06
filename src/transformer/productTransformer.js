const dotenv = require('dotenv');
dotenv.config();
module.exports = {

   
    transformProductDetail: (datas) => {
        return transformProduct(datas);
    },

    transformProducts: (datas) => {
        return transform(datas);
    },

   


};

const transformProduct = (data) => {
    if (data) {
        let returnData = {
            'id': data.id,
            'title': data ? data.title : null,
            'image': data ? process.env.APP_URL+data.image : null
        };
        return returnData;

    }
};

const transform = async (productData) => {
    let product = [];
    for (let i = 0; i < productData.length; i++) {
        product.push(await transformProduct(productData[i]));
    }
    return product ? product : [];
};

// const product = async (data) => {

//     let returnData = {
//         'id': data.id,
//         'title': data.title ? data.title : null,
//         'image': data.picture ? data.picture : null,

//     };
//     return returnData;
// };








