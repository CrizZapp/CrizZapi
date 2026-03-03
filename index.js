const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// =========================
// PORTADA (NO JSON HORRIBLE)
// =========================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>CrizZapi</title>
<style>
  body {
    margin: 0;
    background: #0f0f0f;
    color: #fff;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .box {
    background: #161616;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0,0,0,.6);
    width: 90%;
    max-width: 420px;
  }
  h1 {
    margin-top: 0;
    color: #00ffcc;
  }
  ul {
    padding-left: 18px;
  }
  li {
    margin: 6px 0;
  }
  .footer {
    margin-top: 20px;
    font-size: 12px;
    opacity: .6;
  }
</style>
</head>
<body>
  <div class="box">
    <h1>🚀 CrizZapi activa</h1>
    <p>Endpoints disponibles:</p>
    <ul>
      <li>/jugadores</li>
      <li>/hentai</li>
      <li>/nekos</li>
      <li>/mensaje (POST)</li>
    </ul>
    <div class="footer">© CrizZapi</div>
  </div>
</body>
</html>
`);
});

// =========================
// /jugadores (relleno)
// =========================
app.get("/jugadores", (req, res) => {
  res.json([
    { nombre: "Cris", nivel: 10 },
    { nombre: "Camila", nivel: 12 }
  ]);
});

// =========================
// /hentai
// =========================
app.get("/hentai", async (req, res) => {
  try {
    const r = await fetch("https://nekobot.xyz/api/image?type=hentai");
    const d = await r.json();

    if (!d.success) {
      return res.status(500).json({ error: "No se pudo obtener imagen" });
    }

    res.json({
      autor: "CrizZapi",
      resultado: d.message
    });
  } catch (e) {
    res.status(500).json({ error: "Error al conectar con la API" });
  }
});

// =========================
// /nekos
// =========================
app.get("/nekos", async (req, res) => {
  try {
    const r = await fetch("https://api.waifu.pics/sfw/neko");
    const d = await r.json();

    res.json({
      mensaje: "Aquí tienes tu neko",
      url: d.url
    });
  } catch (e) {
    res.status(500).json({ error: "Error al obtener neko" });
  }
});

// =========================
// /mensaje (POST)
// =========================
app.post("/mensaje", (req, res) => {
  const texto = req.body.texto;

  if (!texto) {
    return res.status(400).json({ error: 'Falta el campo "texto"' });
  }

  res.json({
    respuesta: "Recibí tu mensaje: " + texto
  });
});

// =========================
// START
// =========================
app.listen(port, () => {
  console.log("CrizZapi corriendo en puerto " + port);
});
