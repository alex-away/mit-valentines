const mongoose = require('mongoose')
const USER_LOGIN_DATA = new mongoose.Schema({
    Name:String,
    User_Name:String,
    email: String,
    password: String,
    image_url:String,
    gender:String,
},
{
        collection: 'USER_DATA'
})
const USER_DATA = new mongoose.model("USER_DATA", USER_LOGIN_DATA)

module.exports={USER_DATA}