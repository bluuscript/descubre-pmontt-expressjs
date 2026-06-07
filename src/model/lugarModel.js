const pool = require("../config/database");

class Lugar {
  static async crear(lugar) {
    const { nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas } = lugar;
    const query = `
      INSERT INTO lugar (nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async obtenerPorId(id) {
    const query = "SELECT * FROM lugar WHERE id = $1 AND activo = true";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obtenerTodos() {
    const query = "SELECT * FROM lugar WHERE activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  static async obtenerPorCategoria(categoria) {
    const query = "SELECT * FROM lugar WHERE categoria = $1 AND activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query, [categoria]);
    return result.rows;
  }

  static async obtenerPorSector(sector) {
    const query = "SELECT * FROM lugar WHERE sector ILIKE $1 AND activo = true ORDER BY creado_en DESC";
    const result = await pool.query(query, [`%${sector}%`]);
    return result.rows;
  }

  static async actualizar(id, lugar) {
    const { nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas, activo } = lugar;
    const query = `
      UPDATE lugar
      SET nombre = $1, descripcion = $2, categoria = $3, sector = $4, duracion = $5, costo = $6, dificultad = $7, imagen_url = $8, etiquetas = $9, activo = $10
      WHERE id = $11
      RETURNING *
    `;
    const values = [nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas, activo, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async eliminar(id) {
    const query = "UPDATE lugar SET activo = false WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async buscar(termino) {
    const query = `
      SELECT * FROM lugar 
      WHERE (nombre ILIKE $1 OR descripcion ILIKE $1 OR sector ILIKE $1) 
      AND activo = true 
      ORDER BY creado_en DESC
    `;
    const result = await pool.query(query, [`%${termino}%`]);
    return result.rows;
  }
}

module.exports = Lugar;
