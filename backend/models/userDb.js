const mongoose = require('mongoose')
const USER_LOGIN_DATA = new mongoose.Schema({
    Name:String,
    User_Name:String,
    email: String,
    password: String,
    image_url:String,
    gender:String,
    Hobbies: {
        type: [String],  // Array of strings to store multiple hobbies
        default: []      // Default empty array if no hobbies are specified
    },
    // Hobbies:Array[]
},
{
        collection: 'USER_DATA'
})

const USER_DATA = new mongoose.model("USER_DATA", USER_LOGIN_DATA)

module.exports={USER_DATA}