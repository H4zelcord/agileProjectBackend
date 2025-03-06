const db = require('../config/db');

const surveyService = {
    getAllSurveys: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM surveys', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    createSurvey: (title, description) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO surveys (title, description) VALUES (?, ?)';
            db.query(sql, [title, description], (err, result) => {
                if (err) reject(err);
                resolve(result.insertId);
            });
        });
    },

    getQuestionsBySurveyId: (surveyId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM questions WHERE survey_id = ?';
            db.query(sql, [surveyId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    addQuestion: (surveyId, questionText) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO questions (survey_id, question_text) VALUES (?, ?)';
            db.query(sql, [surveyId, questionText], (err, result) => {
                if (err) reject(err);
                resolve(result.insertId);
            });
        });
    }
};

module.exports = surveyService;