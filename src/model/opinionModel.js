const pool = require("../config/database");

class Opinion {
  static async crear(opinion) {
    const { usuario_id, nombre_usuario, lugar_id, titulo, contenido, calificacion } = opinion;
    const query = `
      INSERT INTO opinion (usuario_id, nombre_usuario, lugar_id, titulo, contenido, calificacion)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [usuario_id, nombre_usuario, lugar_id, titulo, contenido, calificacion];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async obtenerPorId(id) {
    const query = "SELECT * FROM opinion WHERE id = $1 AND activo = true";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obtenerTodos() {
    const query = "SELECT * FROM opinion WHERE activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  static async obtenerPorUsuario(usuario_id) {
    const query = "SELECT * FROM opinion WHERE usuario_id = $1 AND activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  }

  static async obtenerPorLugar(lugar_id) {
    const query = "SELECT * FROM opinion WHERE lugar_id = $1 AND activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query, [lugar_id]);
    return result.rows;
  }

  static async actualizar(id, opinion) {
    const { titulo, contenido, calificacion } = opinion;
    const query = `
      UPDATE opinion
      SET titulo = $1, contenido = $2, calificacion = $3, actualizado_en = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const values = [titulo, contenido, calificacion, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async eliminar(id) {
    const query = "UPDATE opinion SET activo = false WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async contarPorLugar(lugar_id) {
    const query = "SELECT COUNT(*) as total FROM opinion WHERE lugar_id = $1 AND activo = true";
    const result = await pool.query(query, [lugar_id]);
    return parseInt(result.rows[0].total);
  }

  static async promedioCalificacion(lugar_id) {
    const query = "SELECT AVG(calificacion) as promedio FROM opinion WHERE lugar_id = $1 AND activo = true";
    const result = await pool.query(query, [lugar_id]);
    return result.rows[0].promedio ? parseFloat(result.rows[0].promedio).toFixed(1) : null;
  }
}

module.exports = Opinion;
