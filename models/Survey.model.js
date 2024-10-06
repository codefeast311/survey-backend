const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    name: String,
    email: String,
    answers: [String]
});

const QuestionSchema = new mongoose.Schema({
    text: String,
    options: [String],
    responses: [String] 
});

const SurveySchema = new mongoose.Schema({
    title: String,
    questions: [QuestionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    responses: [ResponseSchema] 
});

module.exports = mongoose.model('Survey', SurveySchema);
