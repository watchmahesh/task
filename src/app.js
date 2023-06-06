const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const path = require('path');
let expressLoader = {};
const mongoose = require('mongoose');
expressLoader.init = async(app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(methodOverride('_method'));
    app.use(fileUpload());
    app.use(express.static(path.join(__dirname, '../public')));

    app.use(morgan('dev'));
    require('./routes')(app);
    mongoose.connect('mongodb://localhost/User', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
    return app;
};

module.exports = expressLoader;