export async function fetchExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/MAD');
    const data = await response.json();
    return {
      EUR: data.rates.EUR,
      USD: data.rates.USD,
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return {
      EUR: 0.092, // Fallback rates
      USD: 0.10,
    };
  }
}