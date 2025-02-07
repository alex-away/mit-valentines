const mongoose = require('mongoose')
const { USER_DATA } = require('../models/userDb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { sendRegsiterMail } = require('../services/mailservices')
const { uniqueUsernameGenerator } = require('unique-username-generator');
const {name_generator_config_boys,name_generator_config_girls} = require('../services/userNameService')


exports.registerUser = async (req, res) => {

    const { email, password, name ,gender} = req.body
    console.log(email,password,name,gender);
    const findUser = await USER_DATA.findOne({ email: email })
    if (findUser) {
        return res.json({ status:200 ,error:'User Exist'})
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const username = gender === 'Male' ? uniqueUsernameGenerator(name_generator_config_boys) : uniqueUsernameGenerator(name_generator_config_girls)
        const createUser = await USER_DATA({
            User_Name: username,
            Name: name,
            email: email,
            password: hashedPassword,
            gender: gender
        })
        await createUser.save()
        sendRegsiterMail(email,name,username,password);
        console.log('mail sent');
        return res.json({ status:201, message: 'success' })



    } catch (error) {
        console.log(error)
        return res.json({status:500,error:'something went wrong'})
    }
}


//login
exports.loginUser = async (req,res)=>{
    const {username,password} = req.body
    const findUser = await USER_DATA.findOne({User_Name:username})
    if(!findUser) return res.json({status:404,error:'User doesnot exist'})
    try {
        const isPassowrdcValid = await bcrypt.compare(password,findUser.password)

        if(!isPassowrdcValid) return  res.json({status:401,error:'Password Incorrect'})
        
        const token = jwt.sign({ userId: findUser._id , email:findUser.email,names:findUser.username},process.env.JWT_KEY,
            { expiresIn:'1h'})

        return res.json({status:200,message:'success',token})
        
    } catch (error) {
        
        return res.json({error:"something wrong"})
    }
} 

//update hobbies
exports.updateHobbies = async(req,res)=>{
    const {hobbies} = req.body;
    const {token} = req.headers;
    const {userId} = jwt.verify(token,process.env.JWT_KEY);
    const findUser = await USER_DATA.findOne({_id:userId})
    if(!findUser) return res.json({status:404,error:'User doesnot exist'})
    findUser.Hobbies = hobbies;
    await findUser.save();
    return res.json({status:200,message:'Hobbies updated'})
}



exports.authorisation=async(req,res)=>{
    const {token} = req.headers
 
    try {
        const { userId , email } = jwt.verify(token, process.env.JWT_KEY)
        const findUser = await USER_DATA.findOne({email:email,_id:userId})
        if(!findUser) return res.json({status:401,error:"not authorised User"})
        
        return res.json({status:200,message:'Authrisation granted'})

    } catch (error) {
        return res.json({status:404})
    }
}
