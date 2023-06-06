'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    'title': {type: String,required:true},
    'description': {type: String,required:true},
    'image': {type: String,required:true},
    'price': {type: Number,required:true,default:0},
    category_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Category',
	},
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);