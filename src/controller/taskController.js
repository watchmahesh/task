const { isEmpty } = require("lodash");
const { validationResult } = require("express-validator/check");
const { taskService } = require("../services");
const moment = require("moment");
let { Op } = require("sequelize");

let taskController = {
  index: async (req, res, fn) => {
    try {
      return res.render("task/index");
    } catch (error) {
      fn(error);
    }
  },

  addView: async (req, res, fn) => {
    try {
      res.render("task/create");
    } catch (error) {
      fn(error);
    }
  },

  add: async (req, res, fn) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors", errors.mapped());
      req.flash("inputData", req.body);
      return res.redirect("back");
    }
    try {
      const data = {
        name: req.body.name,
        short_description: req.body.short_description,
        date_time: req.body.date_time,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await taskService.add(data);

      req.flash("success_msg", "Task added successfully.");
      return res.redirect("/task");
    } catch (error) {
      fn(error);
    }
  },

  editView: async (req, res) => {
    try {
      let taskId = req.params.id;
      let query = { where: { id: taskId } };
      const task = await taskService.findOne(query);
      if (!task) {
        return res.redirect("/404");
      }
      return res.render("task/edit", {
        task,
        moment,
      });
    } catch (e) {}
  },

  edit: async (req, res, fn) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors", errors.mapped());
      req.flash("inputData", req.body);
      return res.redirect("/task/" + req.params.id);
    }
    try {
      let id = req.params.id;
      let updateData = {
        name: req.body.name,
        short_description: req.body.short_description,
        date_time: req.body.date_time,
        updatedAt: new Date(),
      };
      await taskService.findAndUpdate(id, updateData);
      req.flash("success_msg", "Task updated successfully");
      return res.redirect("/task/");
    } catch (error) {
      fn(error);
    }
  },

  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let task = await taskService.findOne({ where: { id: id } });
      await taskService.delete(id);

      req.flash("success_msg", "Task deleted successfully.");
      return res.redirect("/task");
    } catch (error) {
      req.flash("error_msg", "Something went wrong while deleting category");
      return res.redirect("back");
    }
  },

  filter: async (req, res, fn) => {
    let data = {
      tasks: [],
    };
    try {
      const filterQuery = await buildFilterQuery(req);
      let query = {
        where: filterQuery,
        order: [["id", "DESC"]],
      };
      let tasks = await taskService.findAll(query);
      data["tasks"] = tasks;
      return res.json(data);
    } catch (error) {
      fn(error);
    }
  },
};

module.exports = taskController;

const buildFilterQuery = (req) => {
  let filter = {};
  const { query } = req;
  if (!query) {
    return filter;
  }
  if (query.data == "up_comming") {
    filter["date_time"] = {
      [Op.gte]: new Date(new Date),
    };
  }
  if (query.data == "done") {
    filter["date_time"] = {
      [Op.lte]: new Date(new Date),
    };
  }
  return filter;
};
