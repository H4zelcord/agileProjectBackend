const db = require('../config/db');

exports.generateRecommendations = async (userInput) => {
    try {
        const {
            primaryNeed,
            budget = 1000,
            voiceAssistant,
            connectivity,
            securityFeatures = [],
            lightingPreferences = []
        } = userInput;

        // Fetch all products matching the primary need and budget
        const [products] = await db.query(`
            SELECT * FROM Products
            WHERE price <= ?`, [budget]
        );

        if (!products.length) {
            return [{ message: "No matching products found. Consider adjusting your preferences." }];
        }

        // Filter products based on user preferences
        const filteredProducts = products.filter(p => {
            return (
                (!voiceAssistant || p.compatibility.includes(voiceAssistant)) &&
                (!connectivity || p.connectivity === connectivity) &&
                (!securityFeatures.length || securityFeatures.includes(p.feature)) &&
                (!lightingPreferences.length || lightingPreferences.includes(p.feature))
            );
        });

        if (!filteredProducts.length) {
            return [{ message: "No products matched your refined criteria." }];
        }

        return filteredProducts;

    } catch (error) {
        console.error('Error generating recommendations:', error);
        throw error;
    }
};
