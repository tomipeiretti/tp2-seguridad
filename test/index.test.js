const getWeather = require("../src/index");

test("La función getWeather debe estar definida", () => {
  expect(typeof getWeather).toBe("function");
});

test("La función getWeather devuelve un string", async () => {
  const result = await getWeather("Mendoza");
  expect(typeof result).toBe("string");
});

test('Debe lanzar error si falta la variable de entorno API_KEY', async () => {
  delete process.env.API_KEY; // eliminamos temporalmente la variable
  await expect(getWeather('Mendoza')).rejects.toThrow('No se encontró la variable de entorno API_KEY');
});