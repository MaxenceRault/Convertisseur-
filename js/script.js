// Clé API et URL de l'API
const apiKey = "a59e0f8ea7379ff7cea11ddd"; // Remplace par ta clé API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Fonction de conversion
function convertCurrency() {
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;
  const amount = document.getElementById("amount").value;

  // Vérification du montant
  if (!amount || amount <= 0) {
    document.getElementById("result").textContent = "Veuillez entrer un montant valide.";
    return;
  }

  // Vérification si les devises source et cible sont identiques
  if (fromCurrency === toCurrency) {
    document.getElementById("result").textContent = "Les devises source et cible sont identiques.";
    return;
  }

  // Requête à l'API pour obtenir les taux de change
  fetch(`${apiUrl}${fromCurrency}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Vérifier si les taux de conversion existent pour la devise cible
      const rateTo = data.conversion_rates[toCurrency];
      if (!rateTo) {
        document.getElementById("result").textContent = `Le taux de change pour ${toCurrency} est indisponible.`;
        return;
      }

      // Calcul du montant converti
      const convertedAmount = amount * rateTo;

      // Affichage du résultat
      document.getElementById("result").textContent = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}`;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des taux :", error);
      document.getElementById("result").textContent = "Erreur lors de la conversion.";
    });
}

// Ajoute des écouteurs d'événement sur le champ de saisie et les sélecteurs de devise
document.getElementById("amount").addEventListener("input", convertCurrency);
document.getElementById("from-currency").addEventListener("change", convertCurrency);
document.getElementById("to-currency").addEventListener("change", convertCurrency);
