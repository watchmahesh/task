const dotenv = require('dotenv');
dotenv.config();
module.exports = {

   
    transformCategory: (datas) => {
        return transformProduct(datas);
    },

    transformCategories: (datas) => {
        return transform(datas);
    },



};

const transformProduct = (data) => {
    if (data) {
        let returnData = {
            'id': data.id,
            'title': data ? data.title : null,
        };
        return returnData;

    }
};

const transform =  (productData) => {
    let product = [];
    for (let i = 0; i < productData.length; i++) {
        product.push(transformProduct(productData[i]));
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








