import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/mysql.js';

export const Employee = sequelize.define(
  'empleados',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    departamento: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);
