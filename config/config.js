const dotenv = require('dotenv');

// load .env file
dotenv.config();

module.exports = {
    url: process.env.MONGO_URL,
    port: process.env.PORT,
    secretKey: process.env.JWT_SECRET,
    frontendUrl: process.env.FRONTEND_URL
}