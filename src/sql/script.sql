-- Crear tabla usuario
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  interes_principal VARCHAR(50) DEFAULT 'Naturaleza',
  tipo_viaje VARCHAR(50) DEFAULT 'Turismo relajado',
  preferencias TEXT,
  notas_personales TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ejemplos de INSERT INTO usuario
INSERT INTO usuario (nombre, email, password, interes_principal, tipo_viaje, preferencias)
VALUES ('Descubre Puerto Montt', 'descubre.pmontt@gmail.com', 'inacap.2026', 'Naturaleza', 'Turismo relajado', 'Me interesa conocer naturaleza, gastronomía local y lugares con buena vista para fotografías.');

-- Crear tabla lugares
CREATE TABLE lugar (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(50) NOT NULL, -- Naturaleza, Gastronomía, Cultura, Aventura
  sector VARCHAR(100) NOT NULL,
  duracion VARCHAR(50), -- "45 min a 1 hora", "Día completo", etc.
  costo VARCHAR(50), -- "Gratis", "Medio", "Alto", valor específico
  dificultad VARCHAR(50), -- "Corta", "Media", "Larga"
  imagen_url VARCHAR(255),
  etiquetas TEXT[], -- Array de etiquetas como ["Mariscos", "Artesanía", "Mercado"]
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla favorito (relación usuario-lugar)
CREATE TABLE favorito (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  lugar_id INTEGER NOT NULL REFERENCES lugar(id) ON DELETE CASCADE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(usuario_id, lugar_id) -- Evitar duplicados
);

-- Crear tabla ruta (itinerarios turísticos)
CREATE TABLE ruta (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  duracion_dias INTEGER NOT NULL, -- Número de días del itinerario
  dificultad VARCHAR(50) NOT NULL, -- "Fácil", "Media", "Difícil"
  categoria VARCHAR(50) NOT NULL, -- "Naturaleza", "Gastronomía", "Cultura", "Mixta"
  imagen_url VARCHAR(255),
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla ruta_lugar (relación ruta-lugar)
CREATE TABLE ruta_lugar (
  id SERIAL PRIMARY KEY,
  ruta_id INTEGER NOT NULL REFERENCES ruta(id) ON DELETE CASCADE,
  lugar_id INTEGER NOT NULL REFERENCES lugar(id) ON DELETE CASCADE,
  orden_dia INTEGER NOT NULL, -- Día del itinerario (1, 2, 3, etc.)
  orden_visita INTEGER NOT NULL, -- Orden de visita en ese día
  UNIQUE(ruta_id, lugar_id)
);

-- Crear tabla usuario_ruta (rutas guardadas por usuarios)
CREATE TABLE usuario_ruta (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  ruta_id INTEGER NOT NULL REFERENCES ruta(id) ON DELETE CASCADE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(usuario_id, ruta_id)
);

-- Ejemplos de INSERT INTO lugar
INSERT INTO lugar (nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas)
VALUES ('Mercado Angelmó', 'Sector tradicional reconocido por sus cocinerías, mariscos, pescados y artesanía local.', 'Gastronomía', 'Centro', '2 a 3 horas', 'Medio', 'Media', '/img/galeria/mercado-angelmo.jpg', ARRAY['Mariscos', 'Artesanía', 'Mercado']);

INSERT INTO lugar (nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas)
VALUES ('Costanera de Puerto Montt', 'Paseo urbano frente al mar, ideal para observar el Seno de Reloncaví y tomar fotografías.', 'Naturaleza', 'Costanera', '45 min a 1 hora', 'Gratis', 'Corta', '/img/galeria/costanera-puerto-montt.jpg', ARRAY['Borde costero', 'Vista al mar', 'Caminata']);

INSERT INTO lugar (nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas)
VALUES ('Catedral de Puerto Montt', 'Punto relevante del centro asociado a la identidad histórica y religiosa de la ciudad.', 'Cultura', 'Centro', '30 a 45 min', 'Gratis', 'Corta', '/img/galeria/catedral-puerto-montt.jpeg', ARRAY['Centro', 'Patrimonio', 'Arquitectura']);

INSERT INTO lugar (nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas)
VALUES ('Volcán Osorno', 'Impresionante volcán con vistas panorámicas, accesible desde Puerto Montt hacia la zona de Llanquihue.', 'Naturaleza', 'Llanquihue', 'Día completo', 'Medio', 'Larga', '/img/galeria/volcan-osorno.jpg', ARRAY['Volcán', 'Paisaje', 'Senderismo']);

INSERT INTO lugar (nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas)
VALUES ('Lago Llanquihue', 'El lago más grande de Chile, con aguas cristalinas y paisajes impresionantes de la zona sur.', 'Naturaleza', 'Llanquihue', 'Día completo', 'Variable', 'Larga', '/img/galeria/lago-llanquihue.jpg', ARRAY['Lago', 'Paisaje', 'Fotografía']);

INSERT INTO lugar (nombre, descripcion, categoria, sector, duracion, costo, dificultad, imagen_url, etiquetas)
VALUES ('Isla de Chiloé', 'Isla mágica con arquitectura única, iglesias patrimoniales, cultura y gastronomía tradicional.', 'Cultura', 'Chiloé', 'Día completo', 'Variable', 'Larga', '/img/galeria/isla-chiloe.jpg', ARRAY['Isla', 'Patrimonio', 'Cultura']);

-- Ejemplos de INSERT INTO ruta
INSERT INTO ruta (nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url)
VALUES ('Ruta Gastronómica Puerto Montt', 'Descubre los sabores tradicionales de Puerto Montt visitando mercados, cocinerías y restaurantes locales.', 2, 'Media', 'Gastronomía', '/img/galeria/ruta-gastronomica.jpg');

INSERT INTO ruta (nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url)
VALUES ('Ruta Naturaleza Llanquihue', 'Explora los paisajes impresionantes de la zona de Llanquihue: volcanes, lagos y bosques nativos.', 3, 'Media', 'Naturaleza', '/img/galeria/ruta-naturaleza.jpg');

INSERT INTO ruta (nombre, descripcion, duracion_dias, dificultad, categoria, imagen_url)
VALUES ('Ruta Cultural Patrimonial', 'Recorre los puntos históricos y culturales más importantes de Puerto Montt y sus alrededores.', 2, 'Fácil', 'Cultura', '/img/galeria/ruta-cultural.jpg');

-- Ejemplos de INSERT INTO ruta_lugar (Ruta Gastronómica - Día 1)
INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
VALUES (1, 1, 1, 1); -- Mercado Angelmó

INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
VALUES (1, 2, 1, 2); -- Costanera de Puerto Montt

-- Ejemplos de INSERT INTO ruta_lugar (Ruta Gastronómica - Día 2)
INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
VALUES (1, 3, 2, 1); -- Catedral de Puerto Montt

-- Ejemplos de INSERT INTO ruta_lugar (Ruta Naturaleza)
INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
VALUES (2, 4, 1, 1); -- Volcán Osorno

INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
VALUES (2, 5, 2, 1); -- Lago Llanquihue

-- Ejemplos de INSERT INTO ruta_lugar (Ruta Cultural)
INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
VALUES (3, 3, 1, 1); -- Catedral de Puerto Montt

INSERT INTO ruta_lugar (ruta_id, lugar_id, orden_dia, orden_visita)
VALUES (3, 6, 2, 1); -- Isla de Chiloé

-- Crear tabla preparacion_viaje (checklist y notas del usuario)
CREATE TABLE preparacion_viaje (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  completado BOOLEAN DEFAULT false,
  categoria VARCHAR(50), -- "Equipamiento", "Documentación", "Transporte", "Otro"
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ejemplos de INSERT INTO preparacion_viaje (comentados - usar ID de usuario real)
-- Reemplaza 1 con el ID real de un usuario existente en la base de datos
INSERT INTO preparacion_viaje (usuario_id, titulo, descripcion, completado, categoria)
VALUES (1, 'Reservar alojamiento', 'Buscar y reservar hotel o cabaña en Puerto Montt', false, 'Transporte');

INSERT INTO preparacion_viaje (usuario_id, titulo, descripcion, completado, categoria)
VALUES (1, 'Comprar pasajes', 'Adquirir pasajes de avión o bus hacia Puerto Montt', false, 'Transporte');

INSERT INTO preparacion_viaje (usuario_id, titulo, descripcion, completado, categoria)
VALUES (1, 'Revisar clima', 'Consultar pronóstico del tiempo para los días del viaje', false, 'Documentación');

INSERT INTO preparacion_viaje (usuario_id, titulo, descripcion, completado, categoria)
VALUES (1, 'Empacar impermeable', 'Incluir chaqueta impermeable y calzado cómodo', false, 'Equipamiento');

INSERT INTO preparacion_viaje (usuario_id, titulo, descripcion, completado, categoria)
VALUES (1, 'Cargar batería externa', 'Asegurar que la batería externa esté completamente cargada', false, 'Equipamiento');

INSERT INTO preparacion_viaje (usuario_id, titulo, descripcion, completado, categoria)
VALUES (1, 'Llevar efectivo', 'Retirar dinero en efectivo para gastos menores', false, 'Documentación');

-- Crear tabla opinion (reseñas de usuarios)
CREATE TABLE opinion (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  nombre_usuario VARCHAR(100) NOT NULL,
  lugar_id INTEGER REFERENCES lugar(id) ON DELETE SET NULL,
  titulo VARCHAR(100) NOT NULL,
  contenido TEXT NOT NULL,
  calificacion INTEGER CHECK (calificacion >= 1 AND calificacion <= 5),
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ejemplos de INSERT INTO opinion (comentados - usar IDs reales)
-- Reemplaza 1 con el ID real de un usuario existente
INSERT INTO opinion (usuario_id, nombre_usuario, lugar_id, titulo, contenido, calificacion)
VALUES (1, 'Gary Almonacid', 1, 'Excelente experiencia', 'El mercado Angelmó es increíble, la comida es deliciosa y la artesanía es muy variada.', 5);

INSERT INTO opinion (usuario_id, nombre_usuario, lugar_id, titulo, contenido, calificacion)
VALUES (1, 'Gary Almonacid', 2, 'Hermoso paseo', 'La costanera es perfecta para caminar y disfrutar de las vistas del seno de Reloncaví.', 5);

INSERT INTO opinion (usuario_id, nombre_usuario, lugar_id, titulo, contenido, calificacion)
VALUES (1, 'Gary Almonacid', 4, 'Impresionante', 'El volcán Osorno ofrece vistas espectaculares, definitivamente vale la pena visitar.', 5);
INSERT INTO opinion (usuario_id, nombre_usuario, lugar_id, titulo, contenido, calificacion)
VALUES (1, 'Gary Almonacid', 5, 'Paisaje increíble', 'El lago Llanquihue es hermoso, el agua es cristalina y el entorno es muy tranquilo.', 4);

-- Crear tabla presupuesto (estimación de gastos del usuario)
CREATE TABLE presupuesto (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  dias_viaje INTEGER NOT NULL DEFAULT 2,
  cantidad_personas INTEGER NOT NULL DEFAULT 1,
  estilo_viaje VARCHAR(50) DEFAULT 'Medio',
  total_estimado INTEGER DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(usuario_id)
);

-- Ejemplos de INSERT INTO presupuesto (comentados - usar IDs reales)
-- Reemplaza 1 con el ID real de un usuario existente
INSERT INTO presupuesto (usuario_id, dias_viaje, cantidad_personas, estilo_viaje, total_estimado)
VALUES (1, 3, 2, 'Medio', 360000);

-- Total tablas/entidades 
/*
El modelo actualmente tiene 9 tablas/entidades:

Clasificación
Entidades principales
1.- usuario
2.- lugar
3.- ruta
4.- preparacion_viaje
5.- opinion
6.- presupuesto

Total: 6

Tablas de relación
1.- favorito (usuario ↔ lugar)
2.- ruta_lugar (ruta ↔ lugar)
3.- usuario_ruta (usuario ↔ ruta)

Total: 3
*/