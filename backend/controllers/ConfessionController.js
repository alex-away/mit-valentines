const { CONFESSIONS } = require('../models/confessionDb')
const { USER_DATA } = require('../models/userDb')
exports.postConfession = async (req, res) => {
    const { message } = req.body
    
    try {
        const newConfession = new CONFESSIONS({
            message: message
        })
        await newConfession.save()
        return res.json({ status: 201, message: 'Confession posted successfully' })
    } catch (error) {
        console.error(error)
        return res.json({ status: 500, error: 'Failed to post confession' })
    }
}

exports.getConfessions = async (req, res) => {
    try {
        const confessions = await CONFESSIONS.find().sort({ timestamp: -1 })
        return res.json({ status: 200, confessions })
    } catch (error) {
        console.error(error)
        return res.json({ status: 500, error: 'Failed to fetch confessions' })
    }
} 


exports.allusers = async (req, res) => {
    try {
       //find all users just don't return password and _id
       const users = await USER_DATA.find({}, { password: 0, _id: 0 })
       return res.json({ status: 200, users })
    } catch (error) {
        console.error("err" ,error)
        return res.json({ status: 500, error: 'Failed to fetch users' })
    }
}

