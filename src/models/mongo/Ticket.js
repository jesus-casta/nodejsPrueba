import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    id_equipo_mysql: {
      type: Number,
      required: true,
      min: 1
    },
    asunto: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 120
    },
    descripcion: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000
    },
    prioridad: {
      type: String,
      enum: ['Baja', 'Media', 'Alta', 'Crítica'],
      required: true
    },
    estado: {
      type: String,
      enum: ['Abierto', 'En Proceso', 'Cerrado'],
      default: 'Abierto'
    },
    metadatos_tecnicos: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    fecha_creacion: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

export const Ticket = mongoose.model('tickets_soporte', ticketSchema);
