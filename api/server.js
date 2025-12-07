
const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [
  { id: 1, username: 'admin', password: '123' },
  { id: 2, username: 'user1', password: '456' }
];
//webhook 
//rutas http://localhost:3000/
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API funcionando',
    endpoints: [
      'GET /users',
      'POST /users',
      'POST /login'
    ]
  });
});

//GET USUARIO
app.get('/users', (req, res) => {
  res.json({
    usuarios: usuarios.map(u => ({ id: u.id, username: u.username }))
  });
});

//CREAR USUARIO
app.post('/users', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  
  const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  const nuevoUsuario = { id: nuevoId, username, password };
  
  usuarios.push(nuevoUsuario);
  
  res.status(201).json({
    mensaje: 'Usuario creado',
    usuario: { id: nuevoId, username }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const usuario = usuarios.find(u => 
    u.username === username && u.password === password
  );
  
  if (usuario) {
    res.json({
      mensaje: 'Login correcto',
      usuario: { id: usuario.id, username: usuario.username }
    });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});


/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = require('./server');
const app = express();
app.use(cors());
app.use(express.json());
//\ACPpractica\api\src> npm install
//npm start
//docker: docker build -t dccp/ejemplo-api:v1.0.0 ./api 
//docker run -p 3000:3000 dccp/ejemplo-api:v1.0.0
//login
//docker push dccp/ejemplo-api:v1.0.0
//LOCAL!!
//mongoose.connect('mongodb+srv://Admin:Admin420420@backenddb.f4b02ek.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
//MONGO_URI=mongodb://admin:adminadmin@mongodb:27017/test_base_local?authSource=admin
mongoose.connect('mongodb+srv://alvarod_db_user:djB9u4FbJXd4wdLI@clusterrestaurante.eef3ovc.mongodb.net/restaurante?appName=ClusterRestaurante')

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

//GET USUARIOS
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//NEW USUARIO
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


app.get('/health', (req, res) => {
  res.json({
    status: 'API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
*/