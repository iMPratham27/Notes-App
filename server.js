// SERVER FILE

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const config = require('./config/config');

const app = express();

// database connection
connectDB();

// middleware
app.use(express.json());

// SERVE STATIC FILES FROM views FOLDER
//app.use(express.static(path.join(__dirname, "views")));

const allowedOrigins = [
  'http://127.0.0.1:5500', // Local frontend (dev)
  'http://localhost:5500', // Local frontend (dev)
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(config.frontendUrl);
}

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(config.port, () => {
  console.log(`App started at port: ${config.port}`);
});