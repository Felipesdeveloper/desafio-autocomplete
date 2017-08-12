const express = require('express');
const app = express();

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/presquicao.html');
});

app.listen(3000, function () {
  console.log('Servidor iniciado: http://localhost:3000');
});
