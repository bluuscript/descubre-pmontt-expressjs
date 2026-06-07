const pool = require("../config/database");

class Presupuesto {
  static async crear(presupuesto) {
    const { usuario_id, dias_viaje, cantidad_personas, estilo_viaje, total_estimado } = presupuesto;
    const query = `
      INSERT INTO presupuesto (usuario_id, dias_viaje, cantidad_personas, estilo_viaje, total_estimado)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (usuario_id) 
      DO UPDATE SET 
        dias_viaje = EXCLUDED.dias_viaje,
        cantidad_personas = EXCLUDED.cantidad_personas,
        estilo_viaje = EXCLUDED.estilo_viaje,
        total_estimado = EXCLUDED.total_estimado,
        actualizado_en = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const values = [usuario_id, dias_viaje, cantidad_personas, estilo_viaje, total_estimado];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async obtenerPorUsuario(usuario_id) {
    const query = "SELECT * FROM presupuesto WHERE usuario_id = $1";
    const result = await pool.query(query, [usuario_id]);
    return result.rows[0];
  }

  static async actualizar(usuario_id, presupuesto) {
    const { dias_viaje, cantidad_personas, estilo_viaje, total_estimado } = presupuesto;
    const query = `
      UPDATE presupuesto
      SET dias_viaje = $1, cantidad_personas = $2, estilo_viaje = $3, total_estimado = $4, actualizado_en = CURRENT_TIMESTAMP
      WHERE usuario_id = $5
      RETURNING *
    `;
    const values = [dias_viaje, cantidad_personas, estilo_viaje, total_estimado, usuario_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async eliminar(usuario_id) {
    const query = "DELETE FROM presupuesto WHERE usuario_id = $1 RETURNING *";
    const result = await pool.query(query, [usuario_id]);
    return result.rows[0];
  }
}

module.exports = Presupuesto;
