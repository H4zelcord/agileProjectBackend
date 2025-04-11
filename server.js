const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const admin = require("firebase-admin");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Initialisation de Firebase Admin si non initialisé
if (!admin.apps.length) {
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true }); // 🔥 Ignore les valeurs undefined

// 📌 Import des routes
app.use("/reviews", require("./src/routes/reviews"));
app.use("/pdf", require("./src/routes/pdf"));

// 📌 Route principale
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API !");
});

// 📌 Route pour générer un rapport en PDF
app.get("/api/reports", async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection("reviews").get();
    if (reviewsSnapshot.empty) {
      return res.status(404).json({ error: "Aucun avis trouvé." });
    }

    // 📄 Création du PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // 📝 Titre du rapport
    doc.font("Helvetica-Bold").fontSize(16).text("📋 Rapport des Avis", { align: "center" }).moveDown(2);

    // 📝 Ajout des avis
    reviewsSnapshot.forEach((docData) => {
      const review = docData.data();
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`👤 Utilisateur: ${review.user_id || "Inconnu"} | ⭐ Note: ${review.rating}`)
        .text(`💬 Commentaire: ${review.comment || "Aucun commentaire"}`)
        .moveDown();
    });

    doc.end();
  } catch (error) {
    console.error("❌ Erreur lors de la génération du PDF:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  }
});

// 📌 Route pour ajouter un avis
app.post("/api/reviews", async (req, res) => {
  try {
    const { user_id, rating, comment } = req.body;

    if (!user_id || rating === undefined || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Champs requis manquants ou note invalide (1-5)." });
    }

    const newReview = {
      user_id,
      rating,
      comment: comment || "",
      created_at: new Date().toISOString(),
    };

    await db.collection("reviews").add(newReview);
    res.status(201).json({ message: "✅ Avis ajouté avec succès !" });
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout d'un avis:", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// 📌 Route pour obtenir des recommandations
app.get("/api/recommendations", async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection("reviews").get();
    if (reviewsSnapshot.empty) {
      return res.status(404).json({ error: "Aucune recommandation disponible." });
    }

    const recommendations = reviewsSnapshot.docs.map((docData) => {
      const review = docData.data();
      let recommendation = "Needs Improvement";
      if (review.rating >= 4) {
        recommendation = "Recommended";
      } else if (review.rating === 3) {
        recommendation = "Neutral";
      }
      return { user_id: review.user_id || "Unknown", recommendation };
    });

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("❌ Error for the recommandations:", error);
    res.status(500).json({ error: "Error internal of the server." });
  }
});

// 📌 Utilisation des routes d'authentification
app.use("/api", authRoutes);

// 📌 Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
