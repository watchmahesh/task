'use strict';

const { chefModel } = require('../models');
const bcrypt = require('bcryptjs');

let chefService = {};


chefService.findAll = async (query) => {
    let users = await chefModel.find(query.where).sort(query.sort).limit(query.limit).skip(query.offset);
    return users;
};

chefService.count = async (whereCondition) => {
    const count = await chefModel.find(whereCondition).countDocuments();
    return count;
};

chefService.findOne = async(query) => {
    let user = await chefModel.findOne(query);
    return user;
};

chefService.add = async (data) => {
    let user = await new chefModel(data).save();
    return user;
};

chefService.findOneAndUpdate = async(query, updateData) => {
    let user = await chefModel.findOneAndUpdate(query, updateData);
    return user;
};

chefService.deleteOne = async(query) => {
    return await chefModel.deleteOne(query);
};


module.exports = chefService;