import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/mysql.js';

export const Category = sequelize.define(
  'categorias',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
);
