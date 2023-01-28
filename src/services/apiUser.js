'use strict';

const { ApiUser } = require('../models');
const bcrypt = require('bcryptjs');

let apiUserService = {};

apiUserService.findAll = async(query) => {
    let apiUsers = await ApiUser.findAll({
        where: query.where,
        limit: query.limit,
        order: query.order,
        offset: query.offset,
        include:Professional
    });
    return apiUsers;
};

apiUserService.count = async(query) => {
    let resp = await ApiUser.count(query);
    return resp;
};

apiUserService.findOne = async(query) => {
    let resp = await ApiUser.findOne(query);
    return resp;
};

apiUserService.add = async(data) => {
    let resp = await ApiUser.create(data);
    return resp;
};

apiUserService.delete = async (id) => {
    return ApiUser.destroy({ where: { id: id } });
};

apiUserService.findAndUpdate = async (id, userData) => {
    let user = await ApiUser.update(userData, { where: { id:id } });
    return user;
};

apiUserService.bycrptPassword = async(data)=>{
    let password =  await bcrypt.hashSync(data, bcrypt.genSaltSync(10), null);
    return password;
};

module.exports = apiUserService;