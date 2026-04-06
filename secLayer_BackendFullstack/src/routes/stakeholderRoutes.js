const express = require('express');
const router = express.Router();

const Stakeholder = require("../models/StakeholderController");

router.post("/", async (req, res) => {
  try {
    const stakeholder = new Stakeholder(req.body);
    const nuevoStakeholder = await stakeholder.save();

    res.status(201).json({
      mensaje: "Registro creado correctamente",
      data: nuevoStakeholder
    });

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear registro",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const stakeholders = await Stakeholder.find();

    res.json({
      total: stakeholders.length,
      data: stakeholders
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener registro",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {

    const stakeholder = await Stakeholder.findById(req.params.id);

    if (!stakeholder) {
      return res.status(404).json({
        mensaje: "Registro no encontrado"
      });
    }

    res.json(stakeholder);

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar registro",
      error: error.message
    });
  }
});


router.put("/:id", async (req, res) => {
  try {

    const stakeholderActualizado = await Stakeholder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!stakeholderActualizado) {
      return res.status(404).json({
        mensaje: "Registro no encontrado"
      });
    }

    res.json({
      mensaje: "Registro actualizado",
      data: stakeholderActualizado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar registro",
      error: error.message
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {

    const stakeholderEliminado = await Stakeholder.findByIdAndDelete(req.params.id);

    if (!stakeholderEliminado) {
      return res.status(404).json({
        mensaje: "Registro no encontrado"
      });
    }

    res.json({
      mensaje: "Registro eliminado correctamente",
      data: stakeholderEliminado
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar registro",
      error: error.message
    });
  }
});

module.exports = router;