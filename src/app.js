// App Express
const express = require('express')
const cors = require('cors')
const path = require('path')
const session = require('express-session')

// Rutas
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const healthRoutes = require('./routes/healthRoutes')
const viewRoutes = require('./routes/viewRoutes')
const lugarRoutes = require('./routes/lugarRoutes')
const favoritoRoutes = require('./routes/favoritoRoutes')
const rutaRoutes = require('./routes/rutaRoutes')
const usuarioRutaRoutes = require('./routes/usuarioRutaRoutes')
const preparacionViajeRoutes = require('./routes/preparacionViajeRoutes')
const opinionRoutes = require('./routes/opinionRoutes')
const presupuestoRoutes = require('./routes/presupuestoRoutes')

// App
const app = express()

// View engine
app.set('view engine', 'ejs')
// Views directory
app.set('views', path.join(__dirname, '../views'))
// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Static files
app.use(express.static('public'))
// SweetAlert2
app.use(
  '/sweetalert2',
  express.static(
    path.join(__dirname, '../node_modules/sweetalert2/dist')
  )
)
// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto-puerto-montt-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true en producción con HTTPS
    maxAge: 60 * 60 * 1000 // 1 hora - 3.600.000 ms
  }
}))

// Rutas

// Vistas
app.use("/", viewRoutes)

// Autenticación
app.use("/api/auth", authRoutes)

// Usuarios
app.use("/api/user", userRoutes)

// Lugares
app.use("/api/lugares", lugarRoutes)

// Favoritos
app.use("/api/favoritos", favoritoRoutes)

// Rutas
app.use("/api/rutas", rutaRoutes)

// Rutas guardadas por usuarios
app.use("/api/usuario-rutas", usuarioRutaRoutes)

// Preparación de viaje
app.use("/api/preparacion-viaje", preparacionViajeRoutes)

// Opiniones
app.use("/api/opiniones", opinionRoutes)

// Presupuesto
app.use("/api/presupuesto", presupuestoRoutes)

// Salud
app.use("/api/health", healthRoutes)

module.exports = app

