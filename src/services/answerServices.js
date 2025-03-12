const db = require('../config/db');

const answerService = {
    getAnswersByQuestionId: (questionId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM answers WHERE question_id = ?';
            db.query(sql, [questionId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    addAnswer: (userId, questionId, answerText) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO answers (user_id, question_id, answer_text) VALUES (?, ?, ?)';
            db.query(sql, [userId, questionId, answerText], (err, result) => {
                if (err) reject(err);
                resolve(result.insertId);
            });
        });
    }
};

module.exports = answerService;