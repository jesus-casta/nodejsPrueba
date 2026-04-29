import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mysqlUri = process.env.MYSQL_URI;

if (!mysqlUri) {
  throw new Error('Falta MYSQL_URI en variables de entorno. Asegúrate de configurar la conexión a AWS RDS MySQL.');
}

// Configuración SSL para AWS RDS
const sslConfig = {
  ca: fs.readFileSync(path.join(__dirname, '../../global-bundle.pem')),
  rejectUnauthorized: true
};

export const sequelize = new Sequelize(mysqlUri, {
  logging: false,
  // Configuración recomendada para AWS RDS
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // Configuración SSL para AWS RDS
  dialectOptions: {
    connectTimeout: 60000,
    supportBigNumbers: true,
    bigNumberStrings: true,
    ssl: sslConfig
  }
});
