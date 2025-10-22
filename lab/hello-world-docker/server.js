'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const app = express();

// Dossier dans le conteneur pour stocker les fichiers (volume)
const DATA_DIR = path.join(__dirname, 'data');

// Crée le dossier s'il n'existe pas
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

app.get('/', (req, res) => {
  // Génère un fichier avec un timestamp
  const fileName = `visit-${Date.now()}.txt`;
  fs.writeFileSync(path.join(DATA_DIR, fileName), 'Fichier généré depuis le conteneur !');

  res.send('Hello World from moi! Fichier généré dans le volume !');
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
