const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
//Con ip no funciona
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Admin:Admin420420@backenddb.f4b02ek.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')

const TestUsuario= new mongoose.Schema({
    nombre:String,
    apellido:String})
   const Usuario= mongoose.model('Usuario',TestUsuario);


//http://localhost:5000
//INICIAR 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});