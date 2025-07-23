const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},{ timestamps: true });

// hash password
userSchema.pre('save', async function (next) {
    // Check if password was modified
    if (!this.isModified('password')) {
        return next();
    }

    try{
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }catch(err){
        next(err);
    }
   
});

// model
const User = mongoose.model("User", userSchema);

module.exports = User;