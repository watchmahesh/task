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
            'price': data ? data.price : 0,
            'description': data ? data.description : 0,
            'image': data ? process.env.APP_URL+data.image : null,
            'category': data ? data.category_id.title:null,
        };
        return returnData;

    }
};

const transform =  (productData) => {
    let product = [];
    for (let i = 0; i < productData.length; i++) {
        product.push( transformProduct(productData[i]));
    }
    return product ? product : [];
};









