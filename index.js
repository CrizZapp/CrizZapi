const express = require('express');
const fetch = require('node-fetch'); // si usás Node < 18
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* =========================
   RUTA PRINCIPAL (HTML)
========================= */
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>CrizZapi</title>
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: #e5e7eb;
}
.container {
  max-width: 800px;
  margin: 60px auto;
  background: #020617;
  padding: 40px;
  border-radius: 12px;
}
h1 {
  color: #38bdf8;
}
code {
  background: #020617;
  color: #22c55e;
  padding: 6px 10px;
  border-radius: 6px;
}
footer {
  margin-top: 40px;
  font-size: 12px;
  opacity: .6;
}
</style>
</head>

<body>
<div class="container">
  <h1>🚀 CrizZapi</h1>
  <p>API activa y funcionando correctamente.</p>

  <h3>📌 Endpoints</h3>
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
});

/* =========================
   /jugadores
========================= */
app.get('/jugadores', (req, res) => {
  res.json([
    { nombre: "Cris", nivel: 10 },
    { nombre: "Camila", nivel: 12 }
  ]);
});

/* =========================
   /hentai
========================= */
app.get('/hentai', async (req, res) => {
  try {
    const r = await fetch('https://nekobot.xyz/api/image?type=hentai');
    const j = await r.json();

    if (!j.success) {
      return res.status(500).json({ error: "No se pudo obtener imagen" });
    }

    res.json({
      autor: "CrizZapi",
      url: j.message
    });
  } catch (e) {
    res.status(500).json({ error: "Error al conectar con la API externa" });
  }
});

/* =========================
   /nekos
========================= */
app.get('/nekos', async (req, res) => {
  try {
    const r = await fetch('https://api.waifu.pics/sfw/neko');
    const j = await r.json();

    res.json({
      autor: "CrizZapi",
      url: j.url
    });
  } catch (e) {
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
