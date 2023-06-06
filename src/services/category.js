'use strict';

const { categoryModel } = require('../models');
const bcrypt = require('bcryptjs');

let categoryService = {};


categoryService.findAll = async (query) => {
    let datas = await categoryModel.find(query.where).sort(query.sort).limit(query.limit).skip(query.offset);
    return datas;
};



categoryService.add = async (data) => {
    let item = await new categoryModel(data).save();
    return item;
};



module.exports = categoryService;