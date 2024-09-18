const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

// Clé API et URL corrigée
const apiKey = "a59e0f8ea7379ff7cea11ddd"; // Remplace par ta vraie clé API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Définir le dossier 'front' comme dossier de fichiers statiques
app.use(express.static(path.join(__dirname, "../front")));

// Route pour obtenir les taux de conversion
app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res
      .status(400)
      .json({ error: "Devise source, cible ou montant manquant." });
  }

  try {
    // Requête vers l'API pour la devise source
    const response = await axios.get(`${apiUrl}${from}`);
    console.log(response.data); // Affiche la réponse de l'API dans la console
    const rates = response.data.conversion_rates;

    const rateTo = rates[to];

    if (!rateTo) {
      return res.status(400).json({ error: "Devise non valide." });
    }

    const convertedAmount = amount * rateTo;
    res.json({ from, to, amount, convertedAmount });
  } catch (error) {
    console.error("Erreur lors de la récupération des taux:", error); // Affiche l'erreur dans la console
    res.status(500).json({ error: "Erreur lors de la récupération des taux." });
  }
});

// Démarre le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
