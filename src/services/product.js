'use strict';

const { productModel } = require('../models');
const bcrypt = require('bcryptjs');

let productService = {};


productService.findAll = async (query) => {
    let users = await productModel.find(query.where).sort(query.sort).limit(query.limit).skip(query.offset);
    return users;
};



productService.add = async (data) => {
    let user = await new productModel(data).save();
    return user;
};



module.exports = productService;