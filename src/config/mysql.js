import { Sequelize } from 'sequelize';

const mysqlUri = process.env.MYSQL_URI;

if (!mysqlUri) {
  throw new Error('Falta MYSQL_URI en variables de entorno');
}

export const sequelize = new Sequelize(mysqlUri, {
  logging: false
});
