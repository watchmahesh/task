const dotenv = require('dotenv');
dotenv.config();
module.exports = {

    transformChefDetail: (datas) => {
        return transformChef(datas);
    },

    transformChefs: (datas) => {
        return transform(datas);
    },
};

const transformChef = (data) => {
    if (data) {
        let returnData = {
            'id': data.id,
            'name': data ? data.name : null,
            'designation': data ? data.designation : 0,
            'image': data ? process.env.APP_URL+data.image : null,
            'facebook_link': data ? data.facebook_link:null,
            'instagram_link': data ? data.instagram_link:null,
            'twitter_link': data ? data.twitter_link:null,
        };
        return returnData;

    }
};

const transform =  (data) => {
    let datas = [];
    for (let i = 0; i < data.length; i++) {
        datas.push( transformChef(data[i]));
    }
    return datas ? datas : [];
};









