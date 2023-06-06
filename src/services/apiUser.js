'use strict';

const { userModel } = require('../models');
const bcrypt = require('bcryptjs');

let apiUserService = {};


apiUserService.findAll = async (query) => {
    let users = await userModel.find(query.where).sort(query.sort).limit(query.limit).skip(query.offset);
    return users;
};

apiUserService.count = async (whereCondition) => {
    const count = await userModel.find(whereCondition).countDocuments();
    return count;
};

apiUserService.findOne = async(query) => {
    let user = await userModel.findOne(query);
    return user;
};

apiUserService.add = async (data) => {
    let user = await new userModel(data).save();
    return user;
};

apiUserService.findOneAndUpdate = async(query, updateData) => {
    let user = await userModel.findOneAndUpdate(query, updateData);
    return user;
};

apiUserService.deleteOne = async(query) => {
    return await userModel.deleteOne(query);
};


module.exports = apiUserService;