const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Rota para listar arquivos das pastas automaticamente
app.get('/list/:folder', (req, res) => {
    let folderPath;
    if (req.params.folder === 'musicas') {
        folderPath = path.join(__dirname, 'musicas');
    } else {
        folderPath = path.join(__dirname, 'img', req.params.folder);
    }

    fs.readdir(folderPath, (err, files) => {
        if (err) return res.json([]);
        // Filtra apenas imagens e músicas, ignorando arquivos ocultos
        const validFiles = files.filter(f => f.match(/\.(jpg|jpeg|png|gif|mp3)$/i));
        res.json(validFiles);
    });
});

app.listen(port, () => {
    console.log(`--- CAVALHEIROS S/A BARBEARIA ---`);
    console.log(`Servidor rodando em: http://localhost:${port}`);
    console.log(`Pressione Ctrl+C para desligar o servidor.`);
});