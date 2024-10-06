const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth.routes');
const surveyRoutes = require('./routes/survey.routes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);

module.exports = app;
