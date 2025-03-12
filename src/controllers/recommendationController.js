const { generateRecommendations } = require('../services/recommendationService');

const getRecommendations = async (req, res) => {
    try {
        const surveyData = req.body;
        const recommendations = await generateRecommendations(surveyData);
        res.json(recommendations);
    } catch (error) {
        console.error('Error retrieving recommendations:', error);
        res.status(500).json({ message: 'Error retrieving recommendations', error });
    }
};

module.exports = { getRecommendations };
