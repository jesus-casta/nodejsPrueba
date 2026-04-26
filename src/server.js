import 'dotenv/config';
import { app } from './app.js';
import { connectMongo } from './config/mongo.js';
import { sequelize } from './config/mysql.js';
import './models/mysql/index.js';

const port = Number(process.env.PORT || 3000);

async function bootstrap() {
  await sequelize.authenticate();
  await connectMongo();

  app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('No se pudo iniciar la aplicación:', error.message);
  process.exit(1);
});
