const express = require('express')
const Favorito = require('../model/favoritoModel')
const router = express.Router()

// Agregar lugar a favoritos
router.post('/', async (req, res) => {
  try {
    const { lugar_id } = req.body
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    if (!lugar_id) {
      return res.status(400).json({ error: 'Falta lugar_id' })
    }

    const favorito = await Favorito.agregar(usuario_id, lugar_id)
    res.json({ mensaje: 'Agregado a favoritos', favorito })
  } catch (error) {
    console.error('Error al agregar favorito:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Quitar lugar de favoritos
router.delete('/:lugar_id', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const favorito = await Favorito.quitar(usuario_id, req.params.lugar_id)
    res.json({ mensaje: 'Eliminado de favoritos', favorito })
  } catch (error) {
    console.error('Error al quitar favorito:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Obtener favoritos del usuario
router.get('/', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const favoritos = await Favorito.obtenerPorUsuario(usuario_id)
    res.json(favoritos)
  } catch (error) {
    console.error('Error al obtener favoritos:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Verificar si un lugar es favorito
router.get('/verificar/:lugar_id', async (req, res) => {
  try {
    const usuario_id = req.session.usuario?.id

    if (!usuario_id) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const favorito = await Favorito.verificarFavorito(usuario_id, req.params.lugar_id)
    res.json({ esFavorito: !!favorito })
  } catch (error) {
    console.error('Error al verificar favorito:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
