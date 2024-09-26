require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/doacoes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.log('Erro de conexão com MongoDB:', err));

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de usuários
app.use('/api/users', userRoutes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
