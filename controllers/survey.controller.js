const Survey = require('../models/Survey.model');

/**
 * Controller to fetch user specific surveys.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const fetchSurveys = async( req, res)=>{
    try{
        const userId = req.params.id
        const surveys = await Survey.find({
            createdBy: userId
        })

        return res.status(200).json({
            surveys: surveys || []
        })

    }catch(err){
        res.status(400).send(err);
    }
}

/**
 * Controller to create a new surveys with questions and option.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const createSurvey = async (req, res) => {
    const { title, questions } = req.body;

    if (!Array.isArray(questions) || questions.some(q => !q.text || !Array.isArray(q.options))) {
        return res.status(400).json({ error: "Invalid questions format." });
    }
    
    try {
        const survey = new Survey({
            title,
            questions,
            createdBy: req.user.userId
        });
        await survey.save();
        res.status(201).json(survey);
    } catch (err) {
        res.status(400).send(err);
    }
}

/**
 * Controller to submit survey respone.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const submitSurveyResponse = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        const { name, email, responses } = req.body;

        const existingResponse = survey.responses.find(response => response.email === email);
        if (existingResponse) {
            return res.status(200).json({ success: false, message: 'You have already responded to this survey.' });
        }

        const newResponse = {
            name,
            email,
            answers: responses
        };

        survey.responses.push(newResponse);

        survey.questions.forEach((question, index) => {
            question.responses.push(responses[index]);
        });

        await survey.save();
        res.status(200).json({success: true, survey: survey, message: 'Response submitted successfully'});
    } catch (err) {
        console.error(err); 
        res.status(500).send('Server Error');
    }
}

/**
 * Controller to fetch survey details.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const getSurvey = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) return res.status(404).send('Survey not found');
        
        res.json(survey);
    } catch (err) {
        res.status(500).send(err);
    }
}

/**
 * Controller to fetch survey results.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const getSurveyResult = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        res.json(survey.questions.map(q => ({ text: q.text, responses: q.responses })));
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    fetchSurveys,
    createSurvey,
    submitSurveyResponse,
    getSurvey,
    getSurveyResult
}