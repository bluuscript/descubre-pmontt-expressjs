const pool = require("../config/database");

class Usuario {
  static async crear(usuario) {
    const { nombre, email, password, interes_principal, tipo_viaje, preferencias } = usuario;
    const query = `
      INSERT INTO usuario (nombre, email, password, interes_principal, tipo_viaje, preferencias)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [nombre, email, password, interes_principal, tipo_viaje, preferencias];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async obtenerPorEmail(email) {
    const query = "SELECT * FROM usuario WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async obtenerPorId(id) {
    const query = "SELECT * FROM usuario WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async actualizar(email, usuario) {
    const { nombre, password, interes_principal, tipo_viaje, preferencias, notas_personales } = usuario;
    const query = `
      UPDATE usuario
      SET nombre = $1, password = $2, interes_principal = $3, tipo_viaje = $4, preferencias = $5, notas_personales = $6
      WHERE email = $7
      RETURNING *
    `;
    const values = [nombre, password, interes_principal, tipo_viaje, preferencias, notas_personales, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async actualizarPassword(email, password) {
    const query = `
      UPDATE usuario
      SET password = $1
      WHERE email = $2
      RETURNING *
    `;
    const values = [password, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async eliminar(id) {
    const query = "DELETE FROM usuario WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obtenerTodos() {
    const query = "SELECT * FROM usuario ORDER BY creado_en DESC";
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Usuario;