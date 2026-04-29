import express from 'express';
import cors from 'cors';
import equipmentRoutes from './routes/equipmentRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

export const app = express();

// Middleware CORS
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    app: 'Soporte Informático API',
    rutas: [
      'GET /dashboard',
      'GET /equipos',
      'GET /equipos/:id',
      'POST /equipos',
      'PUT /equipos/:id',
      'DELETE /equipos/:id',
      'GET /empleados',
      'GET /empleados/:id',
      'POST /empleados',
      'PUT /empleados/:id',
      'DELETE /empleados/:id',
      'GET /tickets-soporte',
      'GET /tickets-soporte/:id',
      'POST /tickets-soporte',
      'PUT /tickets-soporte/:id',
      'DELETE /tickets-soporte/:id'
    ]
  });
});

app.get('/dashboard', (req, res) => {
  res.json({
    mensaje: 'Resumen de métricas para inventario y tickets',
    contadores: {
      equipos_disponibles: 'consulta SQL sugerida',
      tickets_abiertos: 'consulta Mongo sugerida'
    }
  });
});

app.use('/equipos', equipmentRoutes);
app.use('/empleados', employeeRoutes);
app.use('/tickets-soporte', ticketRoutes);
app.get('/historial-o-logs', (req, res) => res.redirect('/tickets-soporte'));
app.get('/configuracion-o-perfil', (req, res) => {
  res.json({ entidades_secundarias: ['categorias', 'roles', 'departamentos'] });
});

app.use((req, res) => {
  res.status(404).json({ message: 'not-found.js | Recurso no encontrado' });
});

app.use((err, req, res, next) => {
  const message = err?.message || 'Error interno del servidor';
  res.status(500).json({ message: `error.js | ${message}` });
});
