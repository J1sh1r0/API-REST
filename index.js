const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const sql = require('mssql'); // Importa el paquete para interactuar con SQL Server

const app = express();
const port = process.env.PORT || 8082;

// Configuración de la base de datos con autenticación integrada de Windows
const dbConfig = {
    server: 'localhost', // Nombre del servidor SQL (puedes usar 'localhost' si está en tu máquina local)
    database: 'ArmasDB',  // Nombre de la base de datos
    options: {
        encrypt: true, // Si es necesario, habilitar el cifrado (útil en Azure o para seguridad)
        trustServerCertificate: true, // Usar cuando trabajas localmente y no tienes problemas con certificados
    },
    authentication: {
        type: 'ntlm', // Autenticación integrada de Windows
        options: {
            domain: '', // Deja vacío si no estás en un dominio
            userName: '', // Deja vacío (usará tu usuario de Windows)
            password: '', // Deja vacío
        },
    },
};

// Conectar a la base de datos
async function connectToDatabase() {
    try {
        await sql.connect(dbConfig); // Conecta con la base de datos usando la configuración
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}

// Llamar a la función para conectarse a la base de datos
connectToDatabase();

// Middleware para permitir solicitudes desde otros dominios (CORS)
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Armas de Fuego',
            version: '1.0.0',
        },
        servers: [{ url: `http://localhost:${port}` }],
    },
    apis: [`${path.join(__dirname, 'index.js')}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
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
        const result = await sql.query('SELECT * FROM Armas'); // Consulta para obtener todas las armas
        res.json(result.recordset); // Devuelve las armas en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener armas' }); // Maneja errores en la consulta
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
        // Inserta una nueva arma en la base de datos
        const result = await sql.query(
            `INSERT INTO Armas (nombre, calibre, tipo, pais_origen) VALUES ('${nombre}', '${calibre}', '${tipo}', '${pais_origen}')`
        );
        res.status(201).json({ message: 'Arma creada exitosamente' }); // Respuesta exitosa
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear arma' }); // Maneja errores en la inserción
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en puerto ${port}`);
});