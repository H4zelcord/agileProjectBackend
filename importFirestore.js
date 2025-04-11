const admin = require("firebase-admin");
const fs = require("fs");

// Initialisation de Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Charger et parser le JSON
const filePath = "./survey_system.json";
const rawData = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Filtrer uniquement les tables contenant des données
const tables = rawData.filter(item => item.type === "table");

async function importData() {
  for (let table of tables) {
    let collectionName = table.name?.trim();
    if (!collectionName) {
      console.error("❌ Erreur : Nom de collection invalide.", table);
      continue;
    }

    let documents = table.data;

    // Si la table est vide, on insère un document placeholder
    if (!Array.isArray(documents) || documents.length === 0) {
      documents = [{ id: "placeholder", info: "This is a placeholder entry" }];
    }

    let batch = db.batch(); // Utiliser un batch pour éviter trop d'écritures

    for (let doc of documents) {
      if (!doc.id) {
        console.warn(`⚠️ Document sans ID dans la collection '${collectionName}'`, doc);
        continue;
      }

      let docRef = db.collection(collectionName).doc(doc.id);
      batch.set(docRef, doc);
    }

    await batch.commit();
    console.log(`✅ Importation de la collection '${collectionName}' terminée !`);
  }
}

// Exécuter l'importation
importData().catch(console.error);
