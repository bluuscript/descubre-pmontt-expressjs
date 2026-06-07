const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../model/usuarioModel')
const router = express.Router()
const nodemailer = require('nodemailer')

// Función para generar contraseña aleatoria
function generarPassword() {
  const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''
  for (let i = 0; i < 6; i++) {
    password += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  }
  return password
}

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const usuario = await Usuario.obtenerPorEmail(email)

    if (!usuario) {
      return res.redirect('/?error=credenciales')
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return res.redirect('/?error=credenciales')
    }

    // Guardar usuario en sesión
    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      interes_principal: usuario.interes_principal,
      tipo_viaje: usuario.tipo_viaje,
      preferencias: usuario.preferencias
    }

    res.redirect('/panel')
  } catch (error) {
    console.error('Error en login:', error)
    res.redirect('/')
  }
})

// Ruta de logout
router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Error al cerrar sesión:', error)
      // res.status(500).json({ error: 'Error al cerrar sesión' })
      res.redirect('/')
    }
    // res.json({ mensaje: 'Sesión cerrada exitosamente' })
    res.redirect('/')
  })
})

// Ruta de recuperación de contraseña
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body

    // Generar nueva contraseña
    const nuevaPassword = generarPassword()

    // Encriptar la nueva contraseña
    const passwordEncriptada = await bcrypt.hash(nuevaPassword, 10)

    // Actualizar la contraseña en la base de datos
    await Usuario.actualizarPassword(email, passwordEncriptada)

    // Enviar correo con la nueva contraseña
    const USER_MAIL = process.env.USER_MAIL
    const USER_PASS = process.env.USER_PASS

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: USER_MAIL,
        pass: USER_PASS,
      },
    })

    await transporter.sendMail({
      from: USER_MAIL,
      to: email,
      subject: 'Recuperación de contraseña - Descubre Puerto Montt',
      text: `Tu nueva contraseña es: ${nuevaPassword}\n\nPor favor, cámbiala después de iniciar sesión.`,
    })
    res.redirect('/?correo=enviado')
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error)
    res.redirect('/?correo=error')
  }
})

module.exports = router
