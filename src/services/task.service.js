"use strict";

const { Task } = require("../models");

let taskService = {};

taskService.findAll = async (query) => {
  try {
    let data = await Task.findAll({
      where: query.where,
      order: query.order,
    });
    return data;
  } catch (e) {}
};

taskService.count = async (query) => {
  let resp = await Task.count(query);
  return resp;
};

taskService.findOne = async (query) => {
  let resp = await Task.findOne(query);
  return resp;
};

taskService.add = async (data) => {
  let resp = await Task.create(data);
  return resp;
};

taskService.delete = async (id) => {
  return Task.destroy({ where: { id: id } });
};

taskService.findAndUpdate = async (id, userData) => {
  let user = await Task.update(userData, { where: { id: id } });
  return user;
};

module.exports = taskService;
