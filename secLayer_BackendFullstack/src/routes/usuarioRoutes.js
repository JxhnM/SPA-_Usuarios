const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware');

const Usuario = require('../models/Usuario');
const { crearUsuario } = require('../controllers/usuarioController');

// Crear usuario
router.post("/", crearUsuario);

// Obtener todos los usuarios
router.get("/", verificarToken, async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        console.log(usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener usuario por id
router.get("/:id", verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar usuario
router.put("/:id", verificarToken, async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuarioActualizado);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar usuario
router.delete("/:id", verificarToken, async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;