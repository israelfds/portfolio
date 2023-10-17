const express = require('express');
const path = require('path');
const connection = require('./db/db-conections');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors'); // Importe o módulo cors

const app = express();
app.use(bodyParser.json());

const port = 443;

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/miservice.dnslive.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/miservice.dnslive.net/fullchain.pem')
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/iWasHere', (req, res) => {
  res.sendFile(path.join(__dirname, 'iWasHere.html'));
});

app.post('/api/insertData', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Verifique se já existe um registro com o mesmo email
  const checkDuplicateSql = "SELECT * FROM users WHERE email = ?";
  connection.query(checkDuplicateSql, [email], (err, results) => {
    if (err) {
      console.error("Erro ao verificar duplicatas no banco de dados:", err);
      res.json({ success: false });
    } else {
      if (results.length === 0) {
        // Nenhum registro com o mesmo email encontrado, pode inserir
        const insertSql = "INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)";
        connection.query(insertSql, [firstName, lastName, email], (err, result) => {
          if (err) {
            console.error("Erro ao inserir dados no banco de dados:", err);
            res.json({ success: false });
          } else {
            console.log("Dados inseridos com sucesso!");
            res.json({ success: true });
          }
        });
      } else {
        // Já existe um registro com o mesmo email
        console.log("Já existe um registro com o mesmo email.");
        res.json({ success: false, message: "Email já cadastrado." });
      }
    }
  });
});

// Rota para buscar a lista de nomes e sobrenomes
app.get('/api/getNames', (req, res) => {
  const sql = "SELECT firstname, lastname FROM users";
  connection.query(sql, (err, results) => {
      if (err) {
          console.error("Erro ao buscar dados no banco de dados:", err);
          res.json({ success: false, error: err });
      } else {
          console.log("Dados buscados com sucesso!");
          res.json({ success: true, data: results });
      }
  });
});

const corsOptions = {
  origin: 'https://miservice.dnslive.net',
};

app.use(cors(corsOptions));

const server = https.createServer(sslOptions, app);

server.listen(port, () => {
  console.log(`Server is running at https://miservice.dnslive.net`);
});
