// test/index.test.js
const getWeather = require('../src/index');

// Test 1: que la función esté definida
test('La función getWeather debe estar definida', () => {
  expect(typeof getWeather).toBe('function');
});

// Test 2: que lance error si falta la API_KEY
test('Debe lanzar error si falta la variable de entorno API_KEY', async () => {
  delete process.env.API_KEY; // eliminamos temporalmente la variable
  await expect(getWeather('Mendoza')).rejects.toThrow('No se encontró la variable de entorno API_KEY');
});

// Test 3 (opcional): que devuelva datos válidos si la API_KEY está definida
//  Este test solo funcionará si tenés una API_KEY real cargada
/*
test('Debe devolver datos del clima para Mendoza', async () => {
  process.env.API_KEY = 'tu_api_key_real_aqui';
  const data = await getWeather('Mendoza');
  expect(data).toHaveProperty('main.temp');
  expect(data).toHaveProperty('weather');
});
*/

