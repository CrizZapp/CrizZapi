const express = require('express');
const fetch = require('node-fetch'); // si usás Node < 18
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* =========================
   RUTA PRINCIPAL (BONITA)
========================= */
app.get('/', (req, res) => {

  const data = {
    nombre: "CrizZapi",
    estado: "Activa y funcional",
    version: "1.0.0",
    endpoints: {
      jugadores: "/jugadores",
      hentai: "/hentai",
      nekos: "/nekos",
      mensaje: "/mensaje (POST)"
    },
    autor: "CrizZ"
  };

  res.format({
    'text/html': () => {
      res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>CrizZapi</title>
<style>
body {
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: #e5e7eb;
  padding: 40px;
}
.box {
  max-width: 700px;
  margin: auto;
  background: #020617;
  padding: 30px;
  border-radius: 12px;
}
h1 { color: #38bdf8; }
code {
  background: #020617;
  padding: 5px 10px;
  border-radius: 6px;
  color: #22c55e;
}
footer {
  margin-top: 30px;
  font-size: 12px;
  opacity: .6;
}
</style>
</head>

<body>
<div class="box">
  <h1>🚀 CrizZapi</h1>
  <p>API activa y funcionando correctamente.</p>

  <h3>📌 Endpoints disponibles</h3>
  <ul>
    <li><code>GET /jugadores</code></li>
    <li><code>GET /hentai</code></li>
    <li><code>GET /nekos</code></li>
    <li><code>POST /mensaje</code></li>
  </ul>

  <footer>
    © 2026 CrizZapi — by CrizZ
  </footer>
</div>
</body>
</html>
      `);
    },

    'application/json': () => {
      res.json(data);
    },

    default: () => {
      res.json(data);
    }
  });
});

/* =========================
   /jugadores
========================= */
app.get('/jugadores', (req, res) => {
  const jugadores = [
    { nombre: "Cris", nivel: 10 },
    { nombre: "Camila", nivel: 12 }
  ];
  res.json(jugadores);
});

/* =========================
   /hentai
========================= */
app.get('/hentai', async (req, res) => {
  try {
    const response = await fetch('https://nekobot.xyz/api/image?type=hentai');
    const data = await response.json();

    if (data.success) {
      res.json({
        autor: "CrizZapi",
        resultado: data.message
      });
    } else {
      res.status(500).json({ error: "No se pudo obtener la imagen" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al conectar con la API externa" });
  }
});

/* =========================
   /nekos
========================= */
app.get('/nekos', async (req, res) => {
  try {
    const response = await fetch('https://api.waifu.pics/sfw/neko');
    const data = await response.json();

    res.json({
      autor: "CrizZapi",
      url: data.url
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener neko" });
  }
});

/* =========================
   /mensaje (POST)
========================= */
app.post('/mensaje', (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({
      error: 'Falta el campo "texto"'
    });
  }

  res.json({
    respuesta: `Recibí tu mensaje: ${texto}`
  });
});

/* =========================
   SERVIDOR
========================= */
app.listen(port, () => {
  console.log(`🚀 CrizZapi corriendo en puerto ${port}`);
});
