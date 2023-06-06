'use strict';

const { productModel } = require('../models');
const bcrypt = require('bcryptjs');

let productService = {};


productService.findAll = async (query) => {
    let products = await productModel.find(query.where).populate('category_id').sort(query.sort).limit(query.limit).skip(query.offset);
    return products;
};



productService.add = async (data) => {
    let user = await new productModel(data).save();
    return user;
};



module.exports = productService;