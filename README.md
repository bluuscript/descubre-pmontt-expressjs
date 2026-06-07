# Descubre Puerto Montt

Plataforma web de turismo para Puerto Montt, Chile. Permite a los usuarios explorar atractivos turísticos, planificar viajes, gestionar favoritos y personalizar su experiencia de viaje.

## Características

- **Autenticación de usuarios**
  - Registro de nuevos usuarios con confirmación de contraseña
  - Inicio de sesión con validación
  - Recuperación de contraseña con envío de correo
  - Gestión de sesiones con express-session
  - Icono de ojo para ver/ocultar contraseñas

- **Panel personalizado "Mi viaje"**
  - Estadísticas dinámicas (favoritos, checklist, presupuesto, días)
  - Perfil editable
  - Favoritos de atractivos
  - Recomendaciones según intereses
  - Itinerario sugerido
  - Checklist de viaje con estado de completado
  - Estimación de gastos con estilo de viaje (Económico, Medio, Cómodo)
  - Notas personales
  - Actualización automática de estadísticas en tiempo real

- **Exploración de atractivos**
  - Atractivos turísticos con filtros
  - Buscador de contenido
  - Sistema de favoritos
  - Reseñas de usuarios
  - Mapa interactivo

- **Gastronomía**
  - Menú recomendado
  - Menú de la casa
  - Gastronomía local

- **Interfaz de usuario**
  - Diseño responsivo
  - Notificaciones con SweetAlert2
  - Navegación intuitiva
  - Iconos de Bootstrap Icons

## Estructura del Proyecto

```
descubre-pmontt-expressjs/
│
├── public/                  # Archivos estáticos
│   ├── css/                # Hojas de estilo (Bootstrap)
│   ├── img/                # Imágenes
│   └── js/                 # JavaScript frontend
│
├── src/
│   ├── config/             # Configuración de base de datos
│   │   └── database.js
│   ├── model/              # Modelos de datos
│   │   ├── usuarioModel.js
│   │   ├── lugarModel.js
│   │   ├── favoritoModel.js
│   │   ├── rutaModel.js
│   │   ├── rutaLugarModel.js
│   │   ├── usuarioRutaModel.js
│   │   ├── preparacionViajeModel.js
│   │   ├── opinionModel.js
│   │   └── presupuestoModel.js
│   ├── routes/             # Rutas de la API
│   │   ├── authRoutes.js   # Rutas de autenticación
│   │   ├── userRoutes.js   # Rutas de usuarios
│   │   ├── lugarRoutes.js  # Rutas de lugares
│   │   ├── favoritoRoutes.js # Rutas de favoritos
│   │   ├── rutaRoutes.js   # Rutas de itinerarios
│   │   ├── usuarioRutaRoutes.js # Rutas de usuario-ruta
│   │   ├── preparacionViajeRoutes.js # Rutas de checklist
│   │   ├── opinionRoutes.js # Rutas de reseñas
│   │   ├── presupuestoRoutes.js # Rutas de presupuesto
│   │   ├── healthRoutes.js # Rutas de salud
│   │   └── viewRoutes.js   # Rutas de vistas
│   ├── sql/                # Scripts SQL
│   │   └── script.sql      # Script de creación de base de datos
│   └── app.js              # Configuración principal de Express
│
├── views/                  # Vistas EJS
│   ├── index.ejs           # Página principal
│   └── app/
│       └── panel.ejs       # Panel de usuario
│
├── .env                    # Variables de entorno
├── .gitignore              # Exclusiones de Git
├── package.json            # Dependencias del proyecto
├── server.js               # Punto de inicio
└── README.md               # Documentación
```

## Tecnologías

- **Backend**
  - Node.js
  - Express.js
  - PostgreSQL (Neon Database)

- **Frontend**
  - EJS (Template Engine)
  - Bootstrap 5
  - Bootstrap Icons
  - SweetAlert2 (Notificaciones)

- **Seguridad**
  - bcryptjs (Encriptación de contraseñas)
  - express-session (Gestión de sesiones)

- **Correo**
  - nodemailer (Envío de correos)
  - Gmail SMTP

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno en `.env`:
```env
PORT=8080
DATABASE_URL="postgresql://..."
SESSION_SECRET="tu-secreto-de-sesion"
USER_MAIL="tu-correo@gmail.com"
USER_PASS="tu-contraseña-de-aplicación"
```

## Ejecución

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:8080`

## Usuario Demo

- **Correo:** descubre.pmontt@gmail.com
- **Contraseña:** inacap.2026

## Rutas de la API

### Rutas de Autenticación (POST)
- `/api/auth/login` - Iniciar sesión
- `/api/auth/register` - Registrar usuario
- `/api/auth/logout` - Cerrar sesión
- `/api/auth/forgot` - Recuperar contraseña

### Rutas de Usuarios
- `GET /api/user` - Obtener información del usuario
- `PUT /api/user` - Actualizar perfil del usuario
- `PUT /api/user/notas` - Guardar notas personales

### Rutas de Lugares
- `GET /api/lugares` - Obtener todos los lugares
- `GET /api/lugares/:id` - Obtener un lugar específico

### Rutas de Favoritos
- `GET /api/favoritos` - Obtener favoritos del usuario
- `POST /api/favoritos` - Agregar favorito
- `DELETE /api/favoritos/:id` - Eliminar favorito

### Rutas de Itinerarios
- `GET /api/rutas` - Obtener todas las rutas
- `POST /api/rutas` - Crear nueva ruta
- `DELETE /api/rutas/:id` - Eliminar ruta

### Rutas de Usuario-Ruta
- `GET /api/usuario-rutas` - Obtener rutas guardadas del usuario
- `POST /api/usuario-rutas` - Guardar ruta del usuario
- `DELETE /api/usuario-rutas/:id` - Eliminar ruta guardada

### Rutas de Checklist (Preparación de Viaje)
- `GET /api/preparacion-viaje` - Obtener checklist del usuario
- `POST /api/preparacion-viaje` - Agregar ítem al checklist
- `PUT /api/preparacion-viaje/:id/completado` - Marcar ítem como completado
- `DELETE /api/preparacion-viaje/:id` - Eliminar ítem del checklist

### Rutas de Reseñas (Opiniones)
- `GET /api/opiniones` - Obtener todas las opiniones
- `POST /api/opiniones` - Crear nueva opinión
- `DELETE /api/opiniones/:id` - Eliminar opinión

### Rutas de Presupuesto
- `GET /api/presupuesto` - Obtener presupuesto del usuario
- `PUT /api/presupuesto` - Crear o actualizar presupuesto
- `DELETE /api/presupuesto` - Eliminar presupuesto

### Rutas de Vistas (GET)
- `/` - Página principal
- `/panel` - Panel de usuario (requiere autenticación)

### Rutas de Salud
- `GET /api/health` - Verificación de salud del servidor

## Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| PORT | Puerto del servidor (default: 3000) |
| DATABASE_URL | URL de conexión a PostgreSQL |
| SESSION_SECRET | Secreto para encriptar sesiones |
| USER_MAIL | Correo para envío de notificaciones |
| USER_PASS | Contraseña de aplicación de Gmail |

## Funcionalidades de Seguridad

- Contraseñas encriptadas con bcrypt
- Sesiones con expiración de 1 hora
- Validación de contraseñas (mínimo 6 caracteres, letras y números)
- Confirmación de contraseña al registrar usuario
- Validación en tiempo real de coincidencia de contraseñas
- Icono de ojo para ver/ocultar contraseñas
- Redirección segura después de autenticación
- Protección de rutas privadas

## Base de Datos

El proyecto utiliza PostgreSQL con las siguientes tablas:

### Entidades Principales
- **usuario** - Información de usuarios del sistema
- **lugar** - Atractivos turísticos de Puerto Montt
- **ruta** - Itinerarios sugeridos
- **preparacion_viaje** - Checklist de preparación para el viaje
- **opinion** - Reseñas de usuarios sobre lugares
- **presupuesto** - Estimación de gastos del usuario

### Tablas de Relación
- **favorito** - Relación usuario ↔ lugar
- **ruta_lugar** - Relación ruta ↔ lugar
- **usuario_ruta** - Relación usuario ↔ ruta

### Características del Modelo
- Llaves foráneas con CASCADE DELETE
- Índices para mejorar rendimiento
- Restricciones CHECK para validación de datos
- Timestamps para seguimiento de cambios
- Restricciones UNIQUE para evitar duplicados