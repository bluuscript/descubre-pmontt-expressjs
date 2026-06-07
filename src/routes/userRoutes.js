const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../model/usuarioModel')
const router = express.Router()

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const usuarioExistente = await Usuario.obtenerPorEmail(email)
    if (usuarioExistente) {
      // console.log('Usuario ya existe')
      // res.status(400).json({ error: 'El email ya está registrado' })
      return res.redirect('/?registro=existe')
    }

    const passwordEncriptada = await bcrypt.hash(password, 10)

    const nuevoUsuario = await Usuario.crear({
      nombre: name,
      email,
      password: passwordEncriptada,
      interes_principal: 'Naturaleza',
      tipo_viaje: 'Turismo relajado',
      preferencias: ''
    })

    res.redirect('/?registro=exitoso')
  } catch (error) {
    console.error('Error en registro:', error)
    // console.log("Error en registro:", error)
    // res.status(500).json({ error: 'Error del servidor' })
    res.redirect('/?registro=error')
  }
})

// Ruta para actualizar perfil
router.put('/profile', async (req, res) => {
  try {
    const { nombre, interes_principal, tipo_viaje, preferencias, notas_personales } = req.body
    const email = req.session.usuario?.email

    if (!email) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    // Obtener usuario actual para mantener el password
    const usuarioActual = await Usuario.obtenerPorEmail(email)
    if (!usuarioActual) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const usuarioActualizado = await Usuario.actualizar(email, {
      nombre,
      password: usuarioActual.password,
      interes_principal,
      tipo_viaje,
      preferencias,
      notas_personales
    })

    // Actualizar sesión
    req.session.usuario = {
      id: usuarioActualizado.id,
      nombre: usuarioActualizado.nombre,
      email: usuarioActualizado.email,
      interes_principal: usuarioActualizado.interes_principal,
      tipo_viaje: usuarioActualizado.tipo_viaje,
      preferencias: usuarioActualizado.preferencias,
      notas_personales: usuarioActualizado.notas_personales
    }

    res.json({ mensaje: 'Perfil actualizado exitosamente', usuario: usuarioActualizado })
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Ruta para obtener notas personales
router.get('/notas', async (req, res) => {
  try {
    const email = req.session.usuario?.email

    if (!email) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const usuario = await Usuario.obtenerPorEmail(email)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json({ notas_personales: usuario.notas_personales || '' })
  } catch (error) {
    console.error('Error al obtener notas:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Ruta para guardar notas personales
router.put('/notas', async (req, res) => {
  try {
    const { notas_personales } = req.body
    const email = req.session.usuario?.email

    if (!email) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    // Obtener usuario actual para mantener otros campos
    const usuarioActual = await Usuario.obtenerPorEmail(email)
    if (!usuarioActual) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const usuarioActualizado = await Usuario.actualizar(email, {
      nombre: usuarioActual.nombre,
      password: usuarioActual.password,
      interes_principal: usuarioActual.interes_principal,
      tipo_viaje: usuarioActual.tipo_viaje,
      preferencias: usuarioActual.preferencias,
      notas_personales
    })

    // Actualizar sesión
    req.session.usuario = {
      id: usuarioActualizado.id,
      nombre: usuarioActualizado.nombre,
      email: usuarioActualizado.email,
      interes_principal: usuarioActualizado.interes_principal,
      tipo_viaje: usuarioActualizado.tipo_viaje,
      preferencias: usuarioActualizado.preferencias,
      notas_personales: usuarioActualizado.notas_personales
    }

    res.json({ mensaje: 'Notas guardadas exitosamente', notas_personales })
  } catch (error) {
    console.error('Error al guardar notas:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
