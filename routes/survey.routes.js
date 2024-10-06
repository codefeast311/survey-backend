const express = require('express');
const Survey = require('../models/Survey.model');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { JWT_SECRET } = require('../config');
const { fetchSurveys,
    createSurvey,
    submitSurveyResponse,
    getSurvey,
    getSurveyResult } = require('../controllers/survey.controller')
const authenticate = require('../middleware')

router.get('/fetch-surveys/:id', authenticate, fetchSurveys)
router.post('/create-survey', authenticate, createSurvey);
router.post('/:id/response', submitSurveyResponse);
router.get('/:id', getSurvey);
router.get('/:id/results', getSurveyResult);

module.exports = router;
