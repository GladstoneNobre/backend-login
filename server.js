const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://pagina-de-login-ruddy.vercel.app"
}));

const db = mysql.createConnection({
  host: process.env.DB_HOST || "gondola.proxy.rlwy.net",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "aUwiCcxHOYuqLtGyijPFqhwvNrNOgTLG",
  port: process.env.DB_PORT || "15527",
  database: process.env.DB_NAME || "railway"
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
  } else {
    console.log('Conectado ao banco 🚀');
  }
});

// CADASTRO DA TELA cadastro.html
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const sql = "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)";

  db.query(sql, [nome, email, senha, "Usuário"], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Cadastro concluído com sucesso!" });
  });
});

// LOGIN
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

// CRUD DE USUÁRIOS
app.get('/usuarios', (req, res) => {
  const sql = "SELECT id, nome, email, perfil FROM usuarios";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json(result);
  });
});

app.post('/usuarios', (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  const sql = "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)";

  db.query(sql, [nome, email, senha, perfil], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Usuário cadastrado com sucesso" });
  });
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil } = req.body;

  const sql = "UPDATE usuarios SET nome = ?, email = ?, senha = ?, perfil = ? WHERE id = ?";

  db.query(sql, [nome, email, senha, perfil, id], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso" });
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Usuário excluído com sucesso" });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
