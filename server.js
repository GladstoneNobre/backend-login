const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://pagina-de-login-ruddy.vercel.app"
}));

// 🔗 CONEXÃO COM SEU BANCO (Railway)
const db = mysql.createConnection({
  host: process.env.DB_HOST || "gondola.proxy.rlwy.net",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "aUwiCcxHOYuqLtGyijPFqhwvNrNOgTLG",
  port: process.env.DB_PORT || "15527",
  database: process.env.DB_NAME || "railway"
});

// TESTE DE CONEXÃO
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
  } else {
    console.log('Conectado ao banco 🚀');
  }
});

// 📌 ROTA DE CADASTRO
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Cadastro concluído com sucesso!" });
  });
});

// 📌 ROTA DE LOGIN
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  db.query(sql, [email, senha], (err, result) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    if (result.length > 0) {
      res.json("Login OK");
    } else {
      res.status(401).json("Email ou senha inválidos");
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
