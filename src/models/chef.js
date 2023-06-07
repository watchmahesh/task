const mongoose=require('mongoose')
const Schema=mongoose.Schema;

let chefSchema= new Schema({
    'name': {type: String,required:true},
    'designation': {type: String,required:false},
    'image': {type: String,required:true},
    'facebook_link': {type: String,required:true,default:null},
    'twitter_link': {type: String,required:true,default:null},
    'instaragram_link': {type: Number,required:false,default:null},
})

module.exports=mongoose.model('chef',chefSchema);


