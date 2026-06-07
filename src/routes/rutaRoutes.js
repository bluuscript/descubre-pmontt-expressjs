const express = require('express')
const Ruta = require('../model/rutaModel')
const router = express.Router()

// Obtener todas las rutas
router.get('/', async (req, res) => {
  try {
    const rutas = await Ruta.obtenerTodos()
    res.json(rutas)
  } catch (error) {
    console.error('Error al obtener rutas:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener ruta por ID
router.get('/:id', async (req, res) => {
  try {
    const ruta = await Ruta.obtenerConLugares(req.params.id)
    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' })
    }
    res.json(ruta)
  } catch (error) {
    console.error('Error al obtener ruta:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener rutas por categoría
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const rutas = await Ruta.obtenerPorCategoria(req.params.categoria)
    res.json(rutas)
  } catch (error) {
    console.error('Error al obtener rutas por categoría:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
