import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/mysql.js';
import { Category } from './Category.js';

export const Equipment = sequelize.define(
  'equipos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },
    marca: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    numero_serie: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    estado: {
      type: DataTypes.ENUM('Disponible', 'Asignado', 'En Reparación'),
      allowNull: false,
      defaultValue: 'Disponible'
    }
  },
  {
    timestamps: false
  }
);
