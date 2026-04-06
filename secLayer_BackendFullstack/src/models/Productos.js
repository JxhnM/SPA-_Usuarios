const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    codigo_sku: {
      type: String,
      required: true,
      match: /^[A-Z]{3}-\d{4}$/ // Regex: ABC-1234
    },
    nombre: {
      type: String,
      required: true
    },
    categoria: {
      type: String,
      required: true,
      enum: ["Electrónica", "Hogar", "Oficina"]
    },
    precio: {
      type: Number,
      required: true
    }
  },
  { timestamps: true } // crea createdAt y updatedAt automáticamente
);

module.exports = mongoose.model("Producto", productoSchema);