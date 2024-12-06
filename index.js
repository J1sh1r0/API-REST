const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const mysql = require('mysql2/promise'); // Usamos mysql2 para MySQL


const app = express();
const port = process.env.PORT || 8082;

// Configuración de la base de datos
const dbConfig = {
  host: 'junction.proxy.rlwy.net',
  user: 'root',
  password: 'gFBoHnyNvJoOkUqOLWqyNhtopvxayYid',
  database: 'railway',
  port: 41620,
};

// Crear una conexión global
let connection;

async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
}

connectToDatabase();

// Middleware para permitir solicitudes desde otros dominios (CORS)
app.use(cors({ origin: '*' }));
app.use(express.json()); // Permite recibir datos en formato JSON

// Configuración de Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Gestión de Armas de Fuego API', // Cambia el título
        description: 'API para gestionar armas de fuego en un sistema automatizado de inventario y control.', // Cambia la descripción
        version: '1.0.0',
      },
      server: [{ url: `https://api-rest-fgqq.onrender.com` }], // Cambia la URL si es necesario
    },
    apis: [`${path.join(__dirname, 'index.js')}`],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const customCss = `
  .swagger-ui .topbar {
    background-color: #14054F; /* Color de fondo de la barra superior */
  }
  .swagger-ui .info {
    color: #FF5722; /* Color del texto del título */
  }
`;
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, {
    customCss: '.swagger-ui .topbar { background-color: #4CAF50; }', // Cambia el color de la barra superior
    customJs: '/custom-swagger.js', // Si deseas usar un archivo JavaScript personalizado
  }));
  
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get('/api-spec', (req, res) => {
  res.json(swaggerDocs); // Devuelve la documentación de Swagger en formato JSON
});

// Rutas de la API

/**
 * @swagger
 * /armas:
 *   get:
 *     description: Obtener todas las armas
 *     responses:
 *       200:
 *         description: Lista de armas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   calibre:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   pais_origen:
 *                     type: string
 */
app.get('/armas', async (req, res) => {
    try {
      console.log('Conectando a la base de datos...');
      const [rows] = await connection.query('SELECT * FROM Armas'); // Realiza la consulta
      console.log('Resultado de la consulta:', rows); // Verifica qué está devolviendo la base de datos
      res.json(rows); // Devuelve los resultados
    } catch (err) {
      console.error('Error en la consulta GET /armas:', err);
      res.status(500).json({ message: 'Error al obtener armas' });
    }
  });

/**
 * @swagger
 * /armas/{id}:
 *   get:
 *     description: Obtener arma por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del arma a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Arma encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 calibre:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 pais_origen:
 *                   type: string
 *       404:
 *         description: Arma no encontrada
 */
app.get('/armas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM Armas WHERE id = ?', [id]); // Uso de parámetros
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Arma no encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error en la consulta GET /armas/:id:', err);
    res.status(500).json({ message: 'Error al obtener arma por ID' });
  }
});

/**
 * @swagger
 * /armas:
 *   post:
 *     description: Agregar una nueva arma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               calibre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               pais_origen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Arma creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
app.post('/armas', async (req, res) => {
  const { nombre, calibre, tipo, pais_origen } = req.body;
  try {
    await connection.query(
      'INSERT INTO Armas (nombre, calibre, tipo, pais_origen) VALUES (?, ?, ?, ?)',
      [nombre, calibre, tipo, pais_origen] // Uso de parámetros para evitar inyecciones SQL
    );
    res.status(201).json({ message: 'Arma creada exitosamente' });
  } catch (err) {
    console.error('Error en la consulta POST /armas:', err);
    res.status(500).json({ message: 'Error al crear arma' });
  }
});

/**
 * @swagger
 * /armas/{id}:
 *   put:
 *     description: Actualizar un arma por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del arma a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               calibre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               pais_origen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Arma actualizada exitosamente
 *       404:
 *         description: Arma no encontrada
 *       400:
 *         description: Error en la solicitud
 */
app.put('/armas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, calibre, tipo, pais_origen } = req.body;

  try {
    const [rows] = await connection.query('SELECT * FROM Armas WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Arma no encontrada' });
    }

    await connection.query(
      'UPDATE Armas SET nombre = ?, calibre = ?, tipo = ?, pais_origen = ? WHERE id = ?',
      [nombre, calibre, tipo, pais_origen, id]
    );
    res.json({ message: 'Arma actualizada exitosamente' });
  } catch (err) {
    console.error('Error en la consulta PUT /armas/:id:', err);
    res.status(500).json({ message: 'Error al actualizar arma' });
  }
});

/**
 * @swagger
 * /armas/{id}:
 *   patch:
 *     description: Actualizar parcialmente un arma por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del arma a actualizar parcialmente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               calibre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               pais_origen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Arma parcialmente actualizada
 *       404:
 *         description: Arma no encontrada
 */
app.patch('/armas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, calibre, tipo, pais_origen } = req.body;

  try {
    const [rows] = await connection.query('SELECT * FROM Armas WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Arma no encontrada' });
    }

    const updates = [];
    const params = [];

    if (nombre) {
      updates.push('nombre = ?');
      params.push(nombre);
    }
    if (calibre) {
      updates.push('calibre = ?');
      params.push(calibre);
    }
    if (tipo) {
      updates.push('tipo = ?');
      params.push(tipo);
    }
    if (pais_origen) {
      updates.push('pais_origen = ?');
      params.push(pais_origen);
    }

    params.push(id);

    await connection.query(`UPDATE Armas SET ${updates.join(', ')} WHERE id = ?`, params);
    res.json({ message: 'Arma parcialmente actualizada exitosamente' });
  } catch (err) {
    console.error('Error en la consulta PATCH /armas/:id:', err);
    res.status(500).json({ message: 'Error al actualizar parcialmente el arma' });
  }
});

/**
 * @swagger
 * /armas/{id}:
 *   delete:
 *     description: Eliminar un arma por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del arma a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Arma eliminada exitosamente
 *       404:
 *         description: Arma no encontrada
 */
app.delete('/armas/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await connection.query('SELECT * FROM Armas WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Arma no encontrada' });
      }
  
      await connection.query('DELETE FROM Armas WHERE id = ?', [id]);
      res.json({ message: 'Arma eliminada exitosamente' });
    } catch (err) {
      console.error('Error en la consulta DELETE /armas/:id:', err);
      res.status(500).json({ message: 'Error al eliminar el arma' });
    }
  });
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en puerto ${port}`);
});
