const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

async function getWeather(city = "Mendoza") {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("No se encontró la variable de entorno API_KEY");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
  const res = await fetch(url);
  const data = await res.json();

  const clima = `Clima en ${city}: ${data.main.temp}°C, ${data.weather[0].description}`;
  console.log(clima);
  return clima;
}

// endpoint web
app.get("/", async (req, res) => {
  try {
    const clima = await getWeather("Mendoza");
    res.send(`<h2>${clima}</h2>`);
  } catch (err) {
    res.status(500).send("Error obteniendo el clima");
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en puerto ${PORT}`);
});
