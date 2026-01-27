const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Mi API funciona!');
});

app.get('/jugadores', (req, res) => {
  const jugadores = [
    {"nombre": "Cris", "nivel": 10},
    {"nombre": "Camila", "nivel": 12}
  ];
  res.json(jugadores);
});

app.post('/mensaje', (req, res) => {
  const { texto } = req.body;
  if (texto) {
    res.send(`Recibí tu mensaje: ${texto}`);
  } else {
    res.status(400).send('No recibí ningún texto');
  }
})
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
