require('dotenv').config();
const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };

// Crie uma conexão com o banco de dados
const connection = mysql.createConnection(dbConfig);

// Conecte-se ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados');
  }
});

// Exporte a conexão para que você possa usá-la em outros módulos
module.exports = connection;