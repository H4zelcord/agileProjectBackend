const express = require('express');
const answerController = require('../controllers/answerController');

const router = express.Router();

router.get('/questions/:questionId/answers', answerController.getAnswersByQuestionId);
router.post('/questions/:questionId/answers', answerController.addAnswer);

module.exports = router;