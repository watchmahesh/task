'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    'title': {type: String},
    'status': {type: Boolean,default:true},
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date },
});



module.exports = mongoose.model('Category', categorySchema);