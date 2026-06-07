const express = require('express')
const Presupuesto = require('../model/presupuestoModel')
const router = express.Router()

// Obtener presupuesto del usuario
router.get('/', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const presupuesto = await Presupuesto.obtenerPorUsuario(usuario_id)
    
    // Si no existe presupuesto, retornar valores por defecto
    if (!presupuesto) {
      return res.json({
        dias_viaje: 2,
        cantidad_personas: 1,
        estilo_viaje: 'Medio',
        total_estimado: 0
      })
    }

    res.json({
      dias_viaje: presupuesto.dias_viaje,
      cantidad_personas: presupuesto.cantidad_personas,
      estilo_viaje: presupuesto.estilo_viaje || 'Medio',
      total_estimado: presupuesto.total_estimado || 0
    })
  } catch (error) {
    console.error('Error al obtener presupuesto:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Crear o actualizar presupuesto
router.put('/', async (req, res) => {
  try {
    const { dias_viaje, cantidad_personas, estilo_viaje, total_estimado } = req.body
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    if (!dias_viaje || !cantidad_personas) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    const presupuesto = await Presupuesto.crear({
      usuario_id,
      dias_viaje,
      cantidad_personas,
      estilo_viaje: estilo_viaje || 'Medio',
      total_estimado: total_estimado || 0
    })

    res.json({ mensaje: 'Presupuesto guardado exitosamente', presupuesto })
  } catch (error) {
    console.error('Error al guardar presupuesto:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Eliminar presupuesto
router.delete('/', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const presupuesto = await Presupuesto.eliminar(usuario_id)
    if (!presupuesto) {
      return res.status(404).json({ error: 'Presupuesto no encontrado' })
    }

    res.json({ mensaje: 'Presupuesto eliminado', presupuesto })
  } catch (error) {
    console.error('Error al eliminar presupuesto:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
