const express = require('express')
const UsuarioRuta = require('../model/usuarioRutaModel')
const router = express.Router()

// Agregar ruta guardada
router.post('/', async (req, res) => {
  try {
    const { ruta_id } = req.body
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    if (!ruta_id) {
      return res.status(400).json({ error: 'Falta ruta_id' })
    }

    const usuarioRuta = await UsuarioRuta.agregar(usuario_id, ruta_id)
    res.json({ mensaje: 'Ruta guardada', usuarioRuta })
  } catch (error) {
    console.error('Error al guardar ruta:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Quitar ruta guardada
router.delete('/:ruta_id', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const usuarioRuta = await UsuarioRuta.quitar(usuario_id, req.params.ruta_id)
    res.json({ mensaje: 'Ruta eliminada', usuarioRuta })
  } catch (error) {
    console.error('Error al quitar ruta:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener rutas guardadas del usuario
router.get('/', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const rutas = await UsuarioRuta.obtenerPorUsuario(usuario_id)
    res.json(rutas)
  } catch (error) {
    console.error('Error al obtener rutas guardadas:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Verificar si una ruta está guardada
router.get('/verificar/:ruta_id', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const usuarioRuta = await UsuarioRuta.verificarGuardada(usuario_id, req.params.ruta_id)
    res.json({ guardada: !!usuarioRuta })
  } catch (error) {
    console.error('Error al verificar ruta guardada:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
