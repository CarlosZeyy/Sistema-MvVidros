function formatNumber(tel) {
  let cleanNumber = tel.replace(/\D/g, "");

  if (cleanNumber.length === 8 || cleanNumber.length === 9) {
    cleanNumber = "11" + cleanNumber;
  }

  if (!cleanNumber.startsWith("55")) {
    cleanNumber = "55" + cleanNumber;
  }

  return cleanNumber + "@c.us";
}

module.exports = { formatNumber };
