const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
//LOCAL!!
//mongoose.connect('mongodb+srv://Admin:Admin420420@backenddb.f4b02ek.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
//MONGO_URI=mongodb://admin:adminadmin@mongodb:27017/test_base_local?authSource=admin
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:adminadmin@mongodb:27017/test_base_local?authSource=admin';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado');
  })
  .catch((error) => {
    console.error('Error conectandose:', error.message);
  });

const TestUsuario = new mongoose.Schema({
  nombre: String,
  apellido: String
});
const Usuario = mongoose.model('Usuario', TestUsuario);

// GET USUARIOS
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// NEW USUARIO
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, apellido } = req.body;
    const newUsuario = new Usuario({ nombre, apellido });
    await newUsuario.save();
    res.status(201).json({
      message: 'Usuario creado',
      usuario: newUsuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
app.get('/health', (req, res) => {
  res.json({
    status: 'API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});*/

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});