const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//LOCAL!!
//mongoose.connect('mongodb+srv://Admin:Admin420420@backenddb.f4b02ek.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
//MONGO_URI=mongodb://admin:adminadmin@mongodb:27017/test_base_local?authSource=admin
const MONGO_URI= process.env.MONGO_URI || 'mongodb://admin:adminadmin@mongodb:27017/test_base_local?authSource=admin';

const TestUsuario= new mongoose.Schema({
    nombre:String,
    apellido:String})
   const Usuario= mongoose.model('Usuario',TestUsuario);
//GET USUARIOS
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.json({ error: error.message });
  }
});
//NEW USUARIO




//http://localhost:5000
//INICIAR 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});