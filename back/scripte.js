document
  .getElementById("convert-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const toCurrency = document
      .getElementById("to-currency")
      .value.toUpperCase();

    fetch(`/convert?to=${toCurrency}&amount=${amount}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          document.getElementById("result").textContent = data.error;
        } else {
          document.getElementById("result").textContent = `${
            data.amount
          } USD = ${data.convertedAmount.toFixed(2)} ${data.to}`;
        }
      })
      .catch((error) => {
        document.getElementById("result").textContent =
          "Erreur lors de la conversion.";
      });
  });
