const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Crear nuevo usuario 
const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    //generar salt
    const salt = bcrypt.genSaltSync(10);

    //encriptar contraseña
    const passwordHash = bcrypt.hashSync(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordHash,
      rol
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      ok: true,
      usuario: usuarioGuardado
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear usuario',
      error: error.message
    });
  }
};

module.exports = {
  crearUsuario
}; 
