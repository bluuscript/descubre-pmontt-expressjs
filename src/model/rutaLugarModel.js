const pool = require("../config/database");

class RutaLugar {
  static async agregar(ruta_id, lugar_id, orden_dia, orden_visita) {
    const query = `
      INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (ruta_id, lugar_id) DO UPDATE
      SET orden_dia = $3, orden_visita = $4
      RETURNING *
    `;
    const values = [ruta_id, lugar_id, orden_dia, orden_visita];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async quitar(ruta_id, lugar_id) {
    const query = "DELETE FROM ruta_lugar WHERE ruta_id = $1 AND lugar_id = $2 RETURNING *";
    const result = await pool.query(query, [ruta_id, lugar_id]);
    return result.rows[0];
  }

  static async obtenerPorRuta(ruta_id) {
    const query = `
      SELECT rl.*, l.nombre, l.descripcion, l.categoria, l.sector, l.duracion, l.costo, l.dificultad, l.imagen_url
      FROM ruta_lugar rl
      INNER JOIN lugar l ON rl.lugar_id = l.id
      WHERE rl.ruta_id = $1
      ORDER BY rl.orden_dia, rl.orden_visita
    `;
    const result = await pool.query(query, [ruta_id]);
    return result.rows;
  }

  static async obtenerPorLugar(lugar_id) {
    const query = `
      SELECT rl.*, r.nombre as ruta_nombre, r.descripcion as ruta_descripcion
      FROM ruta_lugar rl
      INNER JOIN ruta r ON rl.ruta_id = r.id
      WHERE rl.lugar_id = $1 AND r.activo = true
      ORDER BY r.creado_en DESC
    `;
    const result = await pool.query(query, [lugar_id]);
    return result.rows;
  }

  static async actualizarOrden(ruta_id, lugar_id, orden_dia, orden_visita) {
    const query = `
      UPDATE ruta_lugar
      SET orden_dia = $1, orden_visita = $2
      WHERE ruta_id = $3 AND lugar_id = $4
      RETURNING *
    `;
    const values = [orden_dia, orden_visita, ruta_id, lugar_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async limpiarRuta(ruta_id) {
    const query = "DELETE FROM ruta_lugar WHERE ruta_id = $1";
    const result = await pool.query(query, [ruta_id]);
    return result.rowCount;
  }
}

module.exports = RutaLugar;
