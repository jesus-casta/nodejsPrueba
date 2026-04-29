# Proyecto Final: Soporte Informático (Node.js + Express + MySQL + MongoDB)

Aplicación backend full-stack orientada a la gestión de inventario de equipos, empleados y tickets de soporte técnico.


## Estado de unificación (v1.1.0)

La API queda estandarizada en **una única versión funcional (`v1.1.0`)** para integrarse con un frontend en **Next.js** y mantener base de datos en **AWS**.

### Variables recomendadas para AWS

```env
PORT=3000
MYSQL_URI=mysql://USER:PASSWORD@<rds-endpoint>:3306/soporte_informatico
MONGO_URI=mongodb://USER:PASSWORD@<documentdb-o-atlas-endpoint>:27017/soporte_informatico
NEXT_PUBLIC_API_URL=https://<tu-api>
```

### Verificación rápida

- `GET /` muestra metadatos de versión unificada.
- `GET /version` confirma stack objetivo: Next.js + persistencia AWS (RDS/DocumentDB o Atlas).

## 1) Funcionalidad de la aplicación

Permite:

- Gestionar inventario de `equipos` (MySQL).
- Gestionar `empleados` (MySQL).
- Registrar y dar seguimiento a `tickets_soporte` con metadatos flexibles (MongoDB).
- Aplicar filtros multi-estado y combinados en listados (`estado`, `prioridad`, `categoría`, etc.).

## 2) Estructura de rutas y funcionalidad

| Ruta | Método(s) | Funcionalidad |
|---|---|---|
| `/dashboard` | GET | Resumen estadístico (placeholder para contadores). |
| `/equipos` | GET, POST | Listar y crear equipos. Filtros: `estado`, `categoria`, `marca`. |
| `/equipos/:id` | GET, PUT, DELETE | Ver, editar o borrar un equipo específico. |
| `/equipos/nuevo` | POST | Convención equivalente a alta (se usa `/equipos`). |
| `/equipos/editar/:id` | PUT | Convención equivalente a edición (se usa `/equipos/:id`). |
| `/empleados` | GET, POST | Listar y crear empleados. Filtro: `departamento`. |
| `/empleados/:id` | GET, PUT, DELETE | Ver, editar o borrar empleado. |
| `/tickets-soporte` | GET, POST | Listar y crear tickets. Filtros: `prioridad`, `estado`, `id_equipo_mysql`. |
| `/tickets-soporte/:id` | GET, PUT, DELETE | Ver, editar o cerrar/borrar ticket. |
| `/historial-o-logs` | GET | Redirección a colección de tickets. |
| `/configuracion-o-perfil` | GET | Entidades secundarias (catálogos). |

## 3) Diseño relacional MySQL (4 tablas)

```mermaid
erDiagram
    categorias ||--o{ equipos : clasifica
    empleados ||--o{ asignaciones : recibe
    equipos ||--o{ asignaciones : se_asigna

    categorias {
      INT id PK
      VARCHAR nombre
    }

    equipos {
      INT id PK
      INT id_categoria FK
      VARCHAR marca
      VARCHAR modelo
      VARCHAR numero_serie UNIQUE
      ENUM estado
    }

    empleados {
      INT id PK
      VARCHAR nombre_completo
      VARCHAR email UNIQUE
      VARCHAR departamento
      DATE fecha_ingreso
      VARCHAR foto
    }

    asignaciones {
      INT id PK
      INT id_equipo FK
      INT id_empleado FK
      DATE fecha_entrega
      TEXT observaciones
    }
```

Archivo SQL con `CREATE TABLE` + `INSERT`: `db/mysql/schema_and_seed.sql`.

## 4) Diseño JSON de la colección MongoDB

Colección: `tickets_soporte`

```json
{
  "_id": "ObjectId",
  "id_equipo_mysql": 1,
  "asunto": "Batería hinchada",
  "descripcion": "Texto largo del incidente",
  "prioridad": "Crítica",
  "estado": "Abierto | En Proceso | Cerrado",
  "metadatos_tecnicos": {
    "version_os": "15.2(7)E5",
    "ultimo_reinicio": "2026-03-20T07:45:00.000Z",
    "codigo_error_bios": "BAT_WARN_01"
  },
  "fecha_creacion": "2026-03-21T09:00:00.000Z"
}
```

Archivo JSON con documentos de inicio: `db/mongo/tickets_soporte.seed.json`.

## 5) Capturas de tablas y colecciones

> Agrega aquí tus capturas desde MySQL Workbench/Mongo Compass:

- `docs/screenshots/mysql_tablas.png`
- `docs/screenshots/mysql_datos.png`
- `docs/screenshots/mongo_coleccion.png`

## 6) Validaciones y manejo de errores

- Validaciones a nivel de modelo (`isEmail`, `required`, `enum`, `min/max`).
- Validación básica previa en controladores antes de crear registros.
- Respuestas controladas para `404` y middleware global de errores (equivalente a `not-found.js` y `error.js`).

## 7) Cómo ejecutar

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Copia variables de entorno:
   ```bash
   cp .env.example .env
   ```
3. Carga SQL en MySQL con el archivo `db/mysql/schema_and_seed.sql`.
4. Importa `db/mongo/tickets_soporte.seed.json` en MongoDB.
5. Inicia la API:
   ```bash
   npm run dev
   ```

## 8) URL desplegada en Vercel

Pendiente de despliegue: **REEMPLAZAR_POR_URL_DE_VERCEL**

## 9) Comentarios adicionales

- Se utiliza **Sequelize** como ORM para MySQL.
- Se utiliza **Mongoose** como ODM para MongoDB.
- Se implementa CRUD completo para 2 tablas MySQL (`equipos`, `empleados`) y 1 colección Mongo (`tickets_soporte`).

## 10) Revisión de contenido y nomenclatura

- Se revisaron rutas, controladores y documentación para mantener una redacción neutral y centrada en el dominio de soporte informático.
- Se recomienda ejecutar auditorías de texto periódicas en el repositorio para evitar referencias de marca no relacionadas con el producto.
