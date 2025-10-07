// test/index.test.js
const getWeather = require('../src/index');

// Test 1: que la función esté definida
test('La función getWeather debe estar definida', () => {
  expect(typeof getWeather).toBe('function');
});

test("La función getWeather devuelve un string", async () => {
  const result = await getWeather("Mendoza");
  expect(typeof result).toBe("string");
});

