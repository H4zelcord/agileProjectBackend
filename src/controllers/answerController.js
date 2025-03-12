const answerService = require('../services/answerService');

const answerController = {
    getAnswersByQuestionId: async (req, res, next) => {
        const { questionId } = req.params;
        try {
            const answers = await answerService.getAnswersByQuestionId(questionId);
            res.json(answers);
        } catch (err) {
            next(err);
        }
    },

    addAnswer: async (req, res, next) => {
        const { questionId } = req.params;
        const { userId, answerText } = req.body;
        try {
            const answerId = await answerService.addAnswer(userId, questionId, answerText);
            res.json({ message: 'Answer added', id: answerId });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = answerController;