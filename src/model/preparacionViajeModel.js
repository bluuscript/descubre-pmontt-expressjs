const pool = require("../config/database");

class PreparacionViaje {
  static async crear(preparacion) {
    const { usuario_id, titulo, descripcion, categoria } = preparacion;
    const query = `
      INSERT INTO preparacion_viaje (usuario_id, titulo, descripcion, categoria)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [usuario_id, titulo, descripcion, categoria];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async obtenerPorId(id) {
    const query = "SELECT * FROM preparacion_viaje WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obtenerPorUsuario(usuario_id) {
    const query = "SELECT * FROM preparacion_viaje WHERE usuario_id = $1 ORDER BY creado_en DESC";
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  }

  static async obtenerPorUsuarioYCategorias(usuario_id, categoria) {
    const query = "SELECT * FROM preparacion_viaje WHERE usuario_id = $1 AND categoria = $2 ORDER BY creado_en DESC";
    const result = await pool.query(query, [usuario_id, categoria]);
    return result.rows;
  }

  static async actualizar(id, preparacion) {
    const { titulo, descripcion, completado, categoria } = preparacion;
    const query = `
      UPDATE preparacion_viaje
      SET titulo = $1, descripcion = $2, completado = $3, categoria = $4, actualizado_en = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const values = [titulo, descripcion, completado, categoria, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async marcarCompletado(id, completado) {
    const query = `
      UPDATE preparacion_viaje
      SET completado = $1, actualizado_en = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const values = [completado, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async eliminar(id) {
    const query = "DELETE FROM preparacion_viaje WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async contarPorUsuario(usuario_id) {
    const query = "SELECT COUNT(*) as total FROM preparacion_viaje WHERE usuario_id = $1";
    const result = await pool.query(query, [usuario_id]);
    return parseInt(result.rows[0].total);
  }

  static async contarCompletadosPorUsuario(usuario_id) {
    const query = "SELECT COUNT(*) as total FROM preparacion_viaje WHERE usuario_id = $1 AND completado = true";
    const result = await pool.query(query, [usuario_id]);
    return parseInt(result.rows[0].total);
  }
}

module.exports = PreparacionViaje;
