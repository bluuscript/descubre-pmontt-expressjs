const pool = require("../config/database");

class UsuarioRuta {
  static async agregar(usuario_id, ruta_id) {
    const query = `
      INSERT INTO usuario_ruta (usuario_id, ruta_id)
      VALUES ($1, $2)
      ON CONFLICT (usuario_id, ruta_id) DO NOTHING
      RETURNING *
    `;
    const result = await pool.query(query, [usuario_id, ruta_id]);
    return result.rows[0];
  }

  static async quitar(usuario_id, ruta_id) {
    const query = "DELETE FROM usuario_ruta WHERE usuario_id = $1 AND ruta_id = $2 RETURNING *";
    const result = await pool.query(query, [usuario_id, ruta_id]);
    return result.rows[0];
  }

  static async obtenerPorUsuario(usuario_id) {
    const query = `
      SELECT ur.*, r.nombre, r.descripcion, r.duracion_dias, r.dificultad, r.categoria, r.imagen_url
      FROM usuario_ruta ur
      INNER JOIN ruta r ON ur.ruta_id = r.id
      WHERE ur.usuario_id = $1 AND r.activo = true
      ORDER BY ur.creado_en DESC
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  }

  static async obtenerPorRuta(ruta_id) {
    const query = `
      SELECT ur.*, u.nombre as usuario_nombre, u.email
      FROM usuario_ruta ur
      INNER JOIN usuario u ON ur.usuario_id = u.id
      WHERE ur.ruta_id = $1
      ORDER BY ur.creado_en DESC
    `;
    const result = await pool.query(query, [ruta_id]);
    return result.rows;
  }

  static async verificarGuardada(usuario_id, ruta_id) {
    const query = "SELECT * FROM usuario_ruta WHERE usuario_id = $1 AND ruta_id = $2";
    const result = await pool.query(query, [usuario_id, ruta_id]);
    return result.rows[0];
  }

  static async contarPorRuta(ruta_id) {
    const query = "SELECT COUNT(*) as total FROM usuario_ruta WHERE ruta_id = $1";
    const result = await pool.query(query, [ruta_id]);
    return parseInt(result.rows[0].total);
  }

  static async contarPorUsuario(usuario_id) {
    const query = "SELECT COUNT(*) as total FROM usuario_ruta WHERE usuario_id = $1";
    const result = await pool.query(query, [usuario_id]);
    return parseInt(result.rows[0].total);
  }
}

module.exports = UsuarioRuta;
