const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 1. Endpoint de Bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: "¡CrizZapi está activa!",
    endpoints: ["/jugadores", "/hentai", "/nekos", "/mensaje"]
  });
});

// 2. Endpoint /jugadores (Estático)
app.get('/jugadores', (req, res) => {
  const jugadores = [
    {"nombre": "Cris", "nivel": 10},
    {"nombre": "Camila", "nivel": 12}
  ];
  res.json(jugadores);
});

// 3. Endpoint /hentai (Corregido)
app.get('/hentai', async (req, res) => {
  try {
    const response = await fetch('https://nekobot.xyz/api/image?type=hentai');
    const data = await response.json();

    if (data.success) {
      res.json({
        autor: "CrizZapi",
        resultado: data.message // Nekobot devuelve la URL en 'message'
      });
    } else {
      res.status(500).json({ error: "No se pudo obtener la imagen" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en la conexión con el servidor de imágenes" });
  }
});

// 4. Endpoint /nekos (NUEVO)
app.get('/nekos', async (req, res) => {
  try {
    // Usamos waifu.pics que es muy rápida y estable
    const response = await fetch('https://api.waifu.pics/sfw/neko');
    const data = await response.json();

    res.json({
      mensaje: "Aquí tienes tu Neko",
      url: data.url
    });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar nekos" });
  }
});

// 5. Endpoint /mensaje (POST)
app.post('/mensaje', (req, res) => {
  const { texto } = req.body;
  if (texto) {
    res.json({ respuesta: `Recibí tu mensaje: ${texto}` });
  } else {
    res.status(400).json({ error: 'Falta el campo "texto" en el cuerpo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
