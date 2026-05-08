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
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao banco 🚀");
  }
});

// CADASTRO
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
      return res.status(500).send("Erro no servidor");
    }

    if (result.length > 0) {
      res.send("Login OK");
    } else {
      res.status(401).send("Email ou senha inválidos");
    }
  });
});

// LISTAR USUÁRIOS
// LISTAR USUÁRIOS DO CRUD
app.get('/usuarios', (req, res) => {
  const sql = "SELECT id, nome, email, perfil FROM usuarios_sistema";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json(result);
  });
});

// INCLUIR USUÁRIO NO CRUD
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  const sql = "INSERT INTO usuarios_sistema (nome, email, senha, perfil) VALUES (?, ?, ?, ?)";

  db.query(sql, [nome, email, senha, perfil || "Usuário"], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Usuário cadastrado com sucesso" });
  });
});

// EDITAR USUÁRIO DO CRUD
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil } = req.body;

  const sql = "UPDATE usuarios_sistema SET nome = ?, email = ?, senha = ?, perfil = ? WHERE id = ?";

  db.query(sql, [nome, email, senha, perfil, id], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso" });
  });
});

// EXCLUIR USUÁRIO DO CRUD
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios_sistema WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Usuário excluído com sucesso" });
  });
});
// INCLUIR USUÁRIO
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  const sql = "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)";

  db.query(sql, [nome, email, senha, perfil || "Usuário"], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Usuário cadastrado com sucesso" });
  });
});

// EDITAR USUÁRIO
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

// EXCLUIR USUÁRIO
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
// LISTAR FORNECEDORES
app.get('/fornecedores', (req, res) => {
  const sql = "SELECT * FROM fornecedores";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json(result);
  });
});

// CADASTRAR FORNECEDOR
app.post('/fornecedores', (req, res) => {
  const { marca, cnpj, telefone, categoria } = req.body;

  const sql = "INSERT INTO fornecedores (marca, cnpj, telefone, categoria) VALUES (?, ?, ?, ?)";

  db.query(sql, [marca, cnpj, telefone, categoria], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Fornecedor cadastrado com sucesso" });
  });
});

// EXCLUIR FORNECEDOR
app.delete('/fornecedores/:id', (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM fornecedores WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("ERRO SQL:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Fornecedor excluído com sucesso" });
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
