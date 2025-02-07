const express = require('express');
const {USER_DATA} = require('../models/userDb');
const jwt = require('jsonwebtoken');

// Function to find female users
const findFemaleUsers = async () => {
    try {
        const femaleUsers = await USER_DATA.find({ gender: 'Female' });
        return femaleUsers;
    } catch (error) {
        throw new Error('Error finding female users: ' + error.message);
    }
};

// Function to find male users
const findMaleUsers = async () => {
    try {
        const maleUsers = await USER_DATA.find({ gender: 'Male' });
        return maleUsers;
    } catch (error) {
        throw new Error('Error finding male users: ' + error.message);
    }
};

// Function to find users with matching hobbies and return a random match
const findMatchByHobbies = async (users, targetHobbies) => {
    try {
        // Filter users who have at least one matching hobby
        const matchedUsers = users.filter(user => {
            if (!user.hobbies || !Array.isArray(user.hobbies)) return false;
            return user.hobbies.some(hobby => targetHobbies.includes(hobby));
        });

        // If no matches found, return null
        if (matchedUsers.length === 0) return null;

        // Return a random user from matched users
        const randomIndex = Math.floor(Math.random() * matchedUsers.length);
        return matchedUsers[randomIndex];
    } catch (error) {
        throw new Error('Error finding match by hobbies: ' + error.message);
    }
};

exports.findMatch = async (req, res) => {
    // const {token} = req.headers;
    const{email} = req.body;
    try {
        // const { userId } = jwt.verify(token, process.env.JWT_KEY);
        
        // if(!userId) return res.json({status:401, error:'Unauthorized'});
        const findUser = await USER_DATA.findOne({email});

        if(!findUser.Hobbies) return res.json({status:401, error:'User does not have hobbies'});
        // Get users based on gender
        let potentialMatches;
        if (findUser.gender === 'Male') {
            potentialMatches = await findFemaleUsers();
        } else {
            potentialMatches = await findMaleUsers();
        }

        // Find a random match based on hobbies
        const randomMatch = await findMatchByHobbies(potentialMatches, findUser.Hobbies || []);


        if (!randomMatch) {
            res.json({ status: 404, message: 'No matches found with similar hobbies' });
        } else {
            res.json({ status: 200, match: randomMatch });
        }

    } catch (error) {
        console.log("error",error);
        res.status(500).json({ message: error.message });
    }
};



