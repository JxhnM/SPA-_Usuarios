const mongoose = require("mongoose");

const stakeholderSchema = new mongoose.Schema(
  {
    tipo: {
     type: String,
     required: false,
     enum: ["CLIENTE","PROOVEDOR"]
    },

    /* clientes */
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minlength: [3, "El nombre debe tener mínimo 3 carácteres"],
      maxlength: [100, "El nombre máximo es 100 carácteres"]
    },

    cedula: {
      type: String,
      required: false,
      match: /^[A-Z]{3}-\d{4}$/ // Regex: ABC-1234
    },

    correo_electronico: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Correo electrónico inválido"]
    },

    
    telefono: {
      type: String,
      required: false,
      match: [/^[0-9]{7,8}$/, "Número de teléfono inválido"]
    },

    direccion: {
      type: String,
      required: false,
      maxlength: 200
    },

     estado: {
      type: String,
      required: false,
      enum: ["activo", "inactivo","suspendido"]
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    },

    nivel_fidelidad: {
     type: String,
     required: false,
     enum: ["BRONCE","PLATA", "ORO", "PLATINO"]
    },

    limite_credito: {
        type: Number,
        min: 0,
        max: 10000
    },
    
    tarjeta_comercio: {
        type: Boolean
    },

    historial_compras: [{
        producto: String,
        monto: Number,
        fecha: Date
    }],

        /* proovedores */
    
     categoria: {
     type: String,
     enum: ["TECNOLOGIA","LOGISTICA", "SERVICIOS", "MATERIA_PRIMA"]
    },

    pais_origen: {
        type: String,
        uppercase: true,
        match: [/^[A-Z]{3}$/, "Solo letras mayúsculas"]
    },

    certificaciones: {
        type: Boolean
    },

    tiempo_entrega_promedio: {
        type: Number
    },

  },
  
  { timestamps: true } // crea createdAt y updatedAt automáticamente
);

module.exports = mongoose.model("Stakeholder", stakeholderSchema);