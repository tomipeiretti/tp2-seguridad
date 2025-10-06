// src/app.js
// Aplicación Node.js que consulta la API de OpenWeatherMap usando fetch
// La API key se inyecta desde GitHub Secrets mediante variables de entorno

async function getWeather(city) {
  const apiKey = process.env.API_KEY; // viene desde el secret de GitHub

  if (!apiKey) {
    throw new Error('No se encontró la variable de entorno API_KEY');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el clima:', error.message);
    throw error;
  }
}

// Si se ejecuta directamente (no importado por otro módulo)
if (require.main === module) {
  getWeather('Mendoza')
    .then(data => {
      console.log(`Clima en ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`);
    })
    .catch(console.error);
}

module.exports = getWeather;