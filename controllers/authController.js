
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

// Register
const register = async(req, res) => {

    const {username, email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(409).json({message: "User already exists!"})
        }

        // Create new user
        const user = await User.create({
            username, email, password
        });

        const token = generateToken(user);

        return res.status(201).json({token, user:{
            id: user._id,
            username: user.username,
            email: user.email
        }});

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

// Login
const login = async(req, res) => {

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        
        // compare passwords
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({message: "Invalid Credentials."});
        }

        const token = generateToken(user);

        return res.status(200).json({token, user:{
            id: user._id,
            username: user.username,
            email: user.email
        }});

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const generateToken = (user) => {
    return jwt.sign(
        {id: user._id},
        config.secretKey,
        {expiresIn: '1h'}
    );
}

module.exports = {
    register,
    login
}