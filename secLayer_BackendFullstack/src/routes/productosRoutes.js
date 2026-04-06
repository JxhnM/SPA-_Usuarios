const express = require('express');
const router = express.Router();
const Producto = require("../models/Productos");

router.post("/", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const productos = await Producto.find();
        console.log(productos);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;