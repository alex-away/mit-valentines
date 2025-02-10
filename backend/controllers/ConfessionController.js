const { CONFESSIONS } = require('../models/confessionDb')
const { USER_DATA } = require('../models/userDb')
const jwt=require('jsonwebtoken');
const dotenv  = require('dotenv');
dotenv.config();
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
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return res.json({ status: 401, error: "No authorization token provided" });
    }
    const token = bearerHeader.split(' ')[1];

    try {
       const {userId} = jwt.verify(token,process.env.JWT_KEY);
       const user = await USER_DATA.findOne({_id:userId});
       let gen;
       if(user.gender=="Male") gen="Female";
       else gen="Male";
       const users = await USER_DATA.find({gender:gen}, { password: 0, _id: 0 });
       return res.json({ status: 200, users });
    } catch (error) {
        console.error("err" ,error);
        return res.json({ status: 500, error: 'Failed to fetch users' });
    }
}


exports.updateLikes = async (req, res) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return res.json({ status: 401, error: "No authorization token provided" });
    }
    const { confessionEmail } = req.body;
    try {
        const token = bearerHeader.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_KEY);
        
        // First check if user exists and hasn't voted
        const user = await USER_DATA.findOne({ _id: userId });
        if (!user) {
            return res.json({ status: 404, error: "User not found" });
        }
        if (user.hasVoted) {
            return res.json({ status: 400, error: "You have already voted" });
        }

        // First update the voter's status
        const voterUpdate = await USER_DATA.findOneAndUpdate(
            { _id: userId },
            { $set: { hasVoted: true } },
            { new: true }
        );

        if (!voterUpdate) {
            return res.json({ status: 404, error: "Failed to update voter status" });
        }

        // Then update the target's votes
        const targetUpdate = await USER_DATA.findOneAndUpdate(
            { email: confessionEmail },
            { $inc: { totalVotesReceived: 1 } },
            { new: true }
        );

        if (!targetUpdate) {
            // Rollback the voter's status if target update fails
            await USER_DATA.findOneAndUpdate(
                { _id: userId },
                { $set: { hasVoted: false } }
            );
            return res.json({ status: 404, error: "Target user not found" });
        }

        return res.json({ 
            status: 200, 
            message: "Vote recorded successfully"
        });
    } catch (error) {
        console.error("err", error);
        return res.json({ status: 500, error: 'Failed to update likes' });
    }
}

