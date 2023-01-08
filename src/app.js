const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator')
let expressLoader = {};
const flash = require('connect-flash');
const session = require('express-session');

expressLoader.init = async(app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(flash());
    app.use(session({
        secret: 'test',
        resave: false,
        saveUninitialized: true
    }));
    app.use(methodOverride('_method'));
    app.use(express.static(path.join(__dirname, '../../public/task')));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(morgan('dev'));
    app.use(async(req, res, next) => {
        res.locals['error_msg'] = req.flash('error_msg');
        res.locals.inputData = req.flash('inputData')[0];
        res.locals['error_arr'] = req.flash('error_arr');
        res.locals['success_msg'] = req.flash('success_msg');
        res.locals['error_excel'] = req.flash('error_excel');
        res.locals.errors = req.flash('errors');
        res.locals.query = req.query;
        res.locals.url = req.url;
        res.locals.session = req.session;
        next();
    });
    require('./routes')(app);
    return app;
};

module.exports = expressLoader;