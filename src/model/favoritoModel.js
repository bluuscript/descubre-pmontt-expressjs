const pool = require("../config/database");

class Favorito {
  static async agregar(usuario_id, lugar_id) {
    const query = `
      INSERT INTO favorito (usuario_id, lugar_id)
      VALUES ($1, $2)
      ON CONFLICT (usuario_id, lugar_id) DO NOTHING
      RETURNING *
    `;
    const result = await pool.query(query, [usuario_id, lugar_id]);
    return result.rows[0];
  }

  static async quitar(usuario_id, lugar_id) {
    const query = "DELETE FROM favorito WHERE usuario_id = $1 AND lugar_id = $2 RETURNING *";
    const result = await pool.query(query, [usuario_id, lugar_id]);
    return result.rows[0];
  }

  static async obtenerPorUsuario(usuario_id) {
    const query = `
      SELECT f.*, l.nombre, l.descripcion, l.categoria, l.sector, l.duracion, l.costo, l.dificultad, l.imagen_url, l.etiquetas
      FROM favorito f
      INNER JOIN lugar l ON f.lugar_id = l.id
      WHERE f.usuario_id = $1 AND l.activo = true
      ORDER BY f.creado_en DESC
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  }

  static async verificarFavorito(usuario_id, lugar_id) {
    const query = "SELECT * FROM favorito WHERE usuario_id = $1 AND lugar_id = $2";
    const result = await pool.query(query, [usuario_id, lugar_id]);
    return result.rows[0];
  }

  static async obtenerPorLugar(lugar_id) {
    const query = `
      SELECT f.*, u.nombre as usuario_nombre, u.email
      FROM favorito f
      INNER JOIN usuario u ON f.usuario_id = u.id
      WHERE f.lugar_id = $1
      ORDER BY f.creado_en DESC
    `;
    const result = await pool.query(query, [lugar_id]);
    return result.rows;
  }

  static async contarPorLugar(lugar_id) {
    const query = "SELECT COUNT(*) as total FROM favorito WHERE lugar_id = $1";
    const result = await pool.query(query, [lugar_id]);
    return parseInt(result.rows[0].total);
  }

  static async contarPorUsuario(usuario_id) {
    const query = "SELECT COUNT(*) as total FROM favorito WHERE usuario_id = $1";
    const result = await pool.query(query, [usuario_id]);
    return parseInt(result.rows[0].total);
  }
}

module.exports = Favorito;
