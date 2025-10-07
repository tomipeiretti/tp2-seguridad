// Simula la rotación automática de una API_KEY

const fs = require('fs');
const path = require('path');

function rotateKey() {
  const newKey = 'API_' + Math.random().toString(36).substring(2, 15);
  const filePath = path.join(__dirname, 'rotated_key.txt');

  fs.writeFileSync(filePath, newKey);
  console.log('Nueva API_KEY generada (simulada):', newKey);
  console.log('Clave almacenada en', filePath);
}

rotateKey();

//se deberia integrar con sistemas como HashiCorp Vault, AWS KMS o Azure Key Vault