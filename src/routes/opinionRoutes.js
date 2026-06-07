const express = require('express')
const Opinion = require('../model/opinionModel')
const router = express.Router()

// Obtener todas las opiniones
router.get('/', async (req, res) => {
  try {
    const opiniones = await Opinion.obtenerTodos()
    res.json(opiniones)
  } catch (error) {
    console.error('Error al obtener opiniones:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener opinión por ID
router.get('/:id', async (req, res) => {
  try {
    const opinion = await Opinion.obtenerPorId(req.params.id)
    if (!opinion) {
      return res.status(404).json({ error: 'Opinión no encontrada' })
    }
    res.json(opinion)
  } catch (error) {
    console.error('Error al obtener opinión:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener opiniones del usuario autenticado
router.get('/usuario/mis-opiniones', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const opiniones = await Opinion.obtenerPorUsuario(usuario_id)
    res.json(opiniones)
  } catch (error) {
    console.error('Error al obtener opiniones del usuario:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener opiniones por lugar
router.get('/lugar/:lugar_id', async (req, res) => {
  try {
    const opiniones = await Opinion.obtenerPorLugar(req.params.lugar_id)
    res.json(opiniones)
  } catch (error) {
    console.error('Error al obtener opiniones del lugar:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Crear nueva opinión
router.post('/', async (req, res) => {
  try {
    const { lugar_id, titulo, contenido, calificacion } = req.body
    const usuario_id = req.session.usuario?.id
    const nombre_usuario = req.session.usuario?.nombre

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    if (!titulo || !contenido || !calificacion) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    const opinion = await Opinion.crear({
      usuario_id,
      nombre_usuario,
      lugar_id,
      titulo,
      contenido,
      calificacion
    })

    res.json({ mensaje: 'Opinión creada', opinion })
  } catch (error) {
    console.error('Error al crear opinión:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Actualizar opinión
router.put('/:id', async (req, res) => {
  try {
    const { titulo, contenido, calificacion } = req.body
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const opinion = await Opinion.actualizar(req.params.id, { titulo, contenido, calificacion })
    if (!opinion) {
      return res.status(404).json({ error: 'Opinión no encontrada' })
    }

    res.json({ mensaje: 'Opinión actualizada', opinion })
  } catch (error) {
    console.error('Error al actualizar opinión:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Eliminar opinión
router.delete('/:id', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const opinion = await Opinion.eliminar(req.params.id)
    if (!opinion) {
      return res.status(404).json({ error: 'Opinión no encontrada' })
    }

    res.json({ mensaje: 'Opinión eliminada', opinion })
  } catch (error) {
    console.error('Error al eliminar opinión:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
