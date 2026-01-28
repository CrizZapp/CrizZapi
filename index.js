const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch si tu versión de Node no tiene fetch
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint principal
app.get('/', (req, res) => {
  res.send('¡Mi API funciona!');
});

// Endpoint /jugadores
app.get('/jugadores', (req, res) => {
  const jugadores = [
    {"nombre": "Cris", "nivel": 10},
    {"nombre": "Camila", "nivel": 12}
  ];
  res.json(jugadores);
});

// Endpoint /waifu que llama a otra API
app.get('/hentai', async (req, res) => {
  try {
    const response = await fetch('https://nekobot.xyz/api/image?type=hentai');
    const data = await response.json(); // normalmente { url: "https://..." }

    // Devolver la URL al cliente o directamente un objeto JSON
    res.json({
      mensaje: "Aquí tienes tu hentai de la API CrizZapp",
      url: data.url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Error al llamar a la API de waifus" });
  }
});

// Endpoint /mensaje
app.post('/mensaje', (req, res) => {
  const { texto } = req.body;
  if (texto) {
    res.send(`Recibí tu mensaje: ${texto}`);
  } else {
    res.status(400).send('No recibí ningún texto');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
