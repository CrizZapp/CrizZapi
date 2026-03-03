const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* =========================
   HOME — LANDING DE API
========================= */
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CrizZapi</title>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  background: radial-gradient(circle at top, #050505, #000);
  color: #fff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CONTENEDOR */
.api-box {
  width: 95%;
  max-width: 500px;
  background: rgba(0,0,0,0.85);
  padding: 28px;
  border-radius: 16px;
  box-shadow:
    0 0 15px #ff66cc,
    0 0 30px rgba(255,102,204,0.4);
  text-align: center;
}

/* TITULO */
.api-box h1 {
  font-size: 2.4em;
  color: #ff66cc;
  margin-bottom: 10px;
  text-shadow:
    0 0 10px #ff66cc,
    0 0 25px #ff66cc;
}

/* TEXTO */
.api-box p {
  margin-bottom: 22px;
  opacity: 0.9;
}

/* ENDPOINTS */
.endpoint {
  margin: 12px 0;
  padding: 14px;
  border-radius: 10px;
  background: #0b0b0b;
  color: #00ffcc;
  font-weight: bold;
  box-shadow:
    0 0 10px rgba(0,255,204,0.6);
  text-shadow: 0 0 8px #00ffcc;
}

/* FOOTER */
footer {
  margin-top: 22px;
  font-size: 12px;
  opacity: 0.6;
}
</style>
</head>

<body>

<div class="api-box">
  <h1>🚀 CrizZapi</h1>
  <p>API activa y funcionando correctamente</p>

  <div class="endpoint">GET /jugadores</div>
  <div class="endpoint">GET /hentai</div>
  <div class="endpoint">GET /nekos</div>
  <div class="endpoint">POST /mensaje</div>

  <footer>© 2026 CrizZapi</footer>
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
    res.json({ autor: "CrizZapi", url: j.message });
  } catch {
    res.status(500).json({ error: "Error al obtener imagen" });
  }
});

/* =========================
   /nekos
========================= */
app.get('/nekos', async (req, res) => {
  try {
    const r = await fetch('https://api.waifu.pics/sfw/neko');
    const j = await r.json();
    res.json({ autor: "CrizZapi", url: j.url });
  } catch {
    res.status(500).json({ error: "Error al obtener neko" });
  }
});

/* =========================
   /mensaje
========================= */
app.post('/mensaje', (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ error: 'Falta "texto"' });
  }
  res.json({ respuesta: \`Recibí tu mensaje: \${texto}\` });
});

/* =========================
   SERVER
========================= */
app.listen(port, () => {
  console.log(\`🚀 CrizZapi corriendo en puerto \${port}\`);
});
