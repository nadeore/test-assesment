const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required:true},
    email: {type:String, required: true},
    mobileNumber: {type:String, required: true},
    profile: {type: String},
    imgPath: {type: String},
    created_at: {type: Date}
});

module.exports = mongoose.model('user', UserSchema, 'user');
