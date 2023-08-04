const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs'); // Importe o módulo 'fs' para leitura do certificado e da chave privada

const app = express();
const port = 443; // Altere o valor da porta para 443, que é a porta padrão para HTTPS

// Caminhos para os arquivos do certificado e da chave privada
const certPath = '/etc/letsencrypt/live/miservice.dnslive.net/fullchain.pem';
const keyPath = '/etc/letsencrypt/live/miservice.dnslive.net/privkey.pem';

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware para lidar com o erro 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server with HTTPS options
https
  .createServer(
    {
      cert: fs.readFileSync(certPath),
      key: fs.readFileSync(keyPath),
    },
    app
  ).listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
