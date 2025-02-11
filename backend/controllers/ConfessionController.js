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
        
        // Find voter and target users
        const voter = await USER_DATA.findOne({ _id: userId });
        const target = await USER_DATA.findOne({ email: confessionEmail });
        
        if (!voter || !target) {
            return res.json({ status: 404, error: "User not found" });
        }
        if (voter.hasVoted) {
            return res.json({ status: 400, error: "You have already voted" });
        }

        // Update voter's status with vote details
        const voterUpdate = await USER_DATA.findOneAndUpdate(
            { _id: userId },
            { 
                $set: { 
                    hasVoted: true,
                    valentineVote: {
                        votedFor: target._id,
                        votedAt: new Date(),
                        revealed: false
                    }
                } 
            },
            { new: true }
        );

        // Update target's vote count
        const targetUpdate = await USER_DATA.findOneAndUpdate(
            { email: confessionEmail },
            { $inc: { totalVotesReceived: 1 } },
            { new: true }
        );

        return res.json({ 
            status: 200, 
            message: "Vote recorded successfully"
        });
    } catch (error) {
        console.error("err", error);
        return res.json({ status: 500, error: 'Failed to update likes' });
    }
}

// Add new endpoint to get valentine results
exports.getValentineResults = async (req, res) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return res.json({ status: 401, error: "No authorization token provided" });
    }

    try {
        const token = bearerHeader.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_KEY);

        // Check if it's Valentine's Day
        const now = new Date();
        const valentinesDay = new Date('2024-02-14T00:00:00Z');
        
        if (now < valentinesDay) {
            return res.json({ 
                status: 403, 
                error: "Results will be revealed on Valentine's Day!" 
            });
        }

        // Get user's vote information
        const user = await USER_DATA.findOne({ _id: userId })
            .populate('valentineVote.votedFor', 'Name User_Name email');

        // Get users who voted for this user
        const admirers = await USER_DATA.find({ 
            'valentineVote.votedFor': userId,
            'valentineVote.revealed': false 
        }, 'Name User_Name email');

        return res.json({
            status: 200,
            results: {
                youVotedFor: user.valentineVote ? {
                    name: user.valentineVote.votedFor.Name,
                    username: user.valentineVote.votedFor.User_Name,
                    email: user.valentineVote.votedFor.email
                } : null,
                votedForYou: admirers.map(admirer => ({
                    name: admirer.Name,
                    username: admirer.User_Name,
                    email: admirer.email
                }))
            }
        });
    } catch (error) {
        console.error("Error fetching valentine results:", error);
        return res.json({ status: 500, error: 'Failed to fetch results' });
    }
}

