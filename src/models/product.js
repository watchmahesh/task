'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    'title': {type: String},
    'image': {type: String},
});



module.exports = mongoose.model('Product', productSchema);