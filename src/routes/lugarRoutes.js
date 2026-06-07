const express = require('express')
const Lugar = require('../model/lugarModel')
const router = express.Router()

// Obtener todos los lugares
router.get('/', async (req, res) => {
  try {
    const lugares = await Lugar.obtenerTodos()
    res.json(lugares)
  } catch (error) {
    console.error('Error al obtener lugares:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener lugar por ID
router.get('/:id', async (req, res) => {
  try {
    const lugar = await Lugar.obtenerPorId(req.params.id)
    if (!lugar) {
      return res.status(404).json({ error: 'Lugar no encontrado' })
    }
    res.json(lugar)
  } catch (error) {
    console.error('Error al obtener lugar:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener lugares por categoría
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const lugares = await Lugar.obtenerPorCategoria(req.params.categoria)
    res.json(lugares)
  } catch (error) {
    console.error('Error al obtener lugares por categoría:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Buscar lugares
router.get('/buscar/:termino', async (req, res) => {
  try {
    const lugares = await Lugar.buscar(req.params.termino)
    res.json(lugares)
  } catch (error) {
    console.error('Error al buscar lugares:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
