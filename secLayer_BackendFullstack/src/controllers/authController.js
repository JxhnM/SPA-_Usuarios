const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // 1. Buscar usuario
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Usuario no existe'
      });
    }

    // 2. Validar contraseña
    const passwordValido = bcrypt.compareSync(
      password,
      usuario.password
    );

    if (!passwordValido) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Password incorrecto'
      });
    }

    // 3. Generar Token
    const token = jwt.sign(
      { uid: usuario.id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    // 4. Respuesta
    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      mensaje: 'Error en login'
    });
  }
};

module.exports = {
  login
};