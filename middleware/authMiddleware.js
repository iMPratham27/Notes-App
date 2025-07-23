const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');

const protect = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: "No token provided"});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, config.secretKey);
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password');
        next();

    }catch(err){
        res.status(401).json({message: "Not authorized, token expired"});
    }
}

module.exports = {protect};