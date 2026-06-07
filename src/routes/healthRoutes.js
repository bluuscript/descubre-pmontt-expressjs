const express = require('express')
const router = express.Router()

// Ruta de salud del servidor
router.get('/', (req, res) => {
  const now = new Date();

  res.status(200).json({
    status: 'ok',
    fechaHora: now.toLocaleString('es-CL', { 
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  });
});

module.exports = router
