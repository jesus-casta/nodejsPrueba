import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/mysql.js';
import { Equipment } from './Equipment.js';
import { Employee } from './Employee.js';

export const Assignment = sequelize.define(
  'asignaciones',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_equipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Equipment,
        key: 'id'
      }
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: 'id'
      }
    },
    fecha_entrega: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);
