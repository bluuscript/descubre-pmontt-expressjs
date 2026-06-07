const express = require('express')
const PreparacionViaje = require('../model/preparacionViajeModel')
const router = express.Router()

// Agregar ítem de preparación
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, categoria } = req.body
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    if (!titulo) {
      return res.status(400).json({ error: 'Falta título' })
    }

    const preparacion = await PreparacionViaje.crear({ usuario_id, titulo, descripcion, categoria })
    res.json({ mensaje: 'Ítem agregado', preparacion })
  } catch (error) {
    console.error('Error al agregar preparación:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener ítems del usuario
router.get('/', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const preparaciones = await PreparacionViaje.obtenerPorUsuario(usuario_id)
    res.json(preparaciones)
  } catch (error) {
    console.error('Error al obtener preparaciones:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Marcar como completado
router.put('/:id/completado', async (req, res) => {
  try {
    const { completado } = req.body
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const preparacion = await PreparacionViaje.marcarCompletado(req.params.id, completado)
    if (!preparacion) {
      return res.status(404).json({ error: 'Ítem no encontrado' })
    }

    res.json({ mensaje: 'Estado actualizado', preparacion })
  } catch (error) {
    console.error('Error al actualizar completado:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Actualizar ítem
router.put('/:id', async (req, res) => {
  try {
    const { titulo, descripcion, categoria } = req.body
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const preparacion = await PreparacionViaje.actualizar(req.params.id, { titulo, descripcion, categoria, completado: false })
    if (!preparacion) {
      return res.status(404).json({ error: 'Ítem no encontrado' })
    }

    res.json({ mensaje: 'Ítem actualizado', preparacion })
  } catch (error) {
    console.error('Error al actualizar preparación:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Eliminar ítem
router.delete('/:id', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const preparacion = await PreparacionViaje.eliminar(req.params.id)
    if (!preparacion) {
      return res.status(404).json({ error: 'Ítem no encontrado' })
    }

    res.json({ mensaje: 'Ítem eliminado', preparacion })
  } catch (error) {
    console.error('Error al eliminar preparación:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
