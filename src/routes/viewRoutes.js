const express = require('express')
const router = express.Router()

// Ruta principal
router.get('/', (req, res) => {
  const error = req.query.error
  const registro = req.query.registro
  const correo = req.query.correo
  res.render('index', { error, registro, correo })
})

// Ruta del panel
router.get('/panel', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/')
  }
  res.render('app/panel', { usuario: req.session.usuario })
})

module.exports = router
