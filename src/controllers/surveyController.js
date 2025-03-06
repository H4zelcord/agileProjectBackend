const surveyService = require('../services/surveyService');

const surveyController = {
    getAllSurveys: async (req, res, next) => {
        try {
            const surveys = await surveyService.getAllSurveys();
            res.json(surveys);
        } catch (err) {
            next(err);
        }
    },

    createSurvey: async (req, res, next) => {
        const { title, description } = req.body;
        try {
            const surveyId = await surveyService.createSurvey(title, description);
            res.json({ message: 'Survey created', id: surveyId });
        } catch (err) {
            next(err);
        }
    },

    getQuestionsBySurveyId: async (req, res, next) => {
        const { surveyId } = req.params;
        try {
            const questions = await surveyService.getQuestionsBySurveyId(surveyId);
            res.json(questions);
        } catch (err) {
            next(err);
        }
    },

    addQuestion: async (req, res, next) => {
        const { surveyId } = req.params;
        const { questionText } = req.body;
        try {
            const questionId = await surveyService.addQuestion(surveyId, questionText);
            res.json({ message: 'Question added', id: questionId });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = surveyController;