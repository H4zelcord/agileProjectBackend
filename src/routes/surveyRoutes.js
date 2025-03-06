const express = require('express');
const surveyController = require('../controllers/surveyController');

const router = express.Router();

router.get('/surveys', surveyController.getAllSurveys);
router.post('/surveys', surveyController.createSurvey);

router.get('/surveys/:surveyId/questions', surveyController.getQuestionsBySurveyId);
router.post('/surveys/:surveyId/questions', surveyController.addQuestion);

module.exports = router;