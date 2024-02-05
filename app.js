const express = require('express');
const { Pool } = require('pg');

const cors = require('cors'); 

const app = express();
const port = 3000;

// Configura la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tienda',
  password: '1234',
  port: 5432,
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Ruta para obtener todos los productos de la tienda
app.get('/producto', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM producto');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Inicia el servidor


app.post('/productos', async (req, res) => {
  const filters = req.body;

  try {
    let query = "SELECT *, encode(imagen, 'base64') AS imagen_base64 FROM producto WHERE imagen IS NOT NULL";

    let queryParams = [];

    if (filters.origen && filters.origen.length > 0) {
      query += ' AND origen IN (' + filters.origen.map((_, index) => '$' + (index + 1)).join(', ') + ')';
      queryParams.push(...filters.origen);
    }

    if (filters.productor && filters.productor.length > 0) {
      query += ' AND productor IN (' + filters.productor.map((_, index) => '$' + (index + 1 + (filters.origen ? filters.origen.length : 0))).join(', ') + ')';
      queryParams.push(...filters.productor);
    }

    const { rows } = await pool.query(query, queryParams);

    // Convertir imágenes a Base64
    const productsWithBase64 = rows.map(product => {
      return {
        ...product,
        imagen_base64: product.imagen_base64.toString('base64')
      };
    });

    res.json(productsWithBase64);
  } catch (error) {
    console.error('Error al obtener productos filtrados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});





app.get('/productos', async (req, res) => {
  const productId = req.query.id;

  if (!productId) {
    return res.status(400).json({ error: 'Se requiere el parámetro "id".' });
  }

  try {
    const query = 'SELECT *, encode(imagen, \'base64\') as imagen_base64 FROM producto WHERE id = $1';
    const result = await pool.query(query, [productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const producto = result.rows[0];
    // Enviar solo los datos necesarios al frontend, incluida la imagen en formato Base64
    const productoConImagenBase64 = {
      id: producto.id,
      nombre_producto: producto.nombre_producto,
      descripcion: producto.descripcion,
      precio: producto.precio,
      productor: producto.productor,
      origen: producto.origen,
      imagen_base64: producto.imagen_base64 // Imagen en formato Base64
    };

    res.json(productoConImagenBase64);
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});



app.post('/comentarios', async (req, res) => {
  const { productName, productId, name, email, comment, rating } = req.body; // Agregar rating al destructuring

  try {
    // Insertar el comentario en la base de datos
    const query = 'INSERT INTO comentarios (id_producto, nombre_producto, user_name, correo, comentario, calificacion) VALUES ($1, $2, $3, $4, $5, $6)'; // Agregar calificacion a la consulta
    await pool.query(query, [productId, productName, name, email, comment, rating]); // Pasar la calificacion como parámetro

    res.status(201).json({ message: 'Comentario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar el comentario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});




app.get('/comentarios', async (req, res) => {
  const productId = req.query.id_producto;

  if (!productId) {
      return res.status(400).json({ error: 'Se requiere el parámetro "id_producto".' });
  }

  try {
      const query = 'SELECT * FROM comentarios WHERE id_producto = $1';
      const result = await pool.query(query, [productId]);

      res.json(result.rows);
  } catch (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

