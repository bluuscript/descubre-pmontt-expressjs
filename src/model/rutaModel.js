const pool = require("../config/database");

class Ruta {
  static async crear(ruta) {
    const { nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url } = ruta;
    const query = `
      INSERT INTO ruta (nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async obtenerPorId(id) {
    const query = "SELECT * FROM ruta WHERE id = $1 AND activo = true";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obtenerTodos() {
    const query = "SELECT * FROM ruta WHERE activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  static async obtenerPorCategoria(categoria) {
    const query = "SELECT * FROM ruta WHERE categoria = $1 AND activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query, [categoria]);
    return result.rows;
  }

  static async actualizar(id, ruta) {
    const { nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url, activo } = ruta;
    const query = `
      UPDATE ruta
      SET nombre = $1, descripcion = $2, duracion_dias = $3, dificultad = $4, categoria = $5, imagen_url = $6, activo = $7
      WHERE id = $8
      RETURNING *
    `;
    const values = [nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url, activo, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async eliminar(id) {
    const query = "UPDATE ruta SET activo = false WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obtenerConLugares(id) {
    const query = `
      SELECT r.*, 
             json_agg(
               json_build_object(
                 'lugar_id', rl.lugar_id,
                 'orden_dia', rl.orden_dia,
                 'orden_visita', rl.orden_visita,
                 'nombre', l.nombre,
                 'descripcion', l.descripcion,
                 'categoria', l.categoria,
                 'sector', l.sector,
                 'duracion', l.duracion,
                 'costo', l.costo,
                 'dificultad', l.dificultad,
                 'imagen_url', l.imagen_url
               ) ORDER BY rl.orden_dia, rl.orden_visita
             ) as lugares
      FROM ruta r
      LEFT JOIN ruta_lugar rl ON r.id = rl.ruta_id
      LEFT JOIN lugar l ON rl.lugar_id = l.id
      WHERE r.id = $1 AND r.activo = true
      GROUP BY r.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Ruta;
