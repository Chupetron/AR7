const express = require('express');
const app = express();
const port = 3000;

// Contraseñas para seguridad (mantenlas seguras)
const PASSWORD_EDITAR_LISTA = 'EditarLista';
const PASSWORD_VACIAR_LISTA = 'VaciarLista';

app.use(express.json());

let gamertags = [];
let pilotosCarrera1 = [];
let pilotosCarrera2 = [];
let pilotosGenerales = [];
let puntosGenerales = [];

app.get('/api/gamertags', (req, res) => {
    res.json(gamertags);
});

app.post('/api/gamertags', (req, res) => {
    const { gamertag } = req.body;
    if (gamertag === PASSWORD_VACIAR_LISTA) {
        gamertags = [];
        res.json({ message: "Lista vaciada." });
    } else if (gamertag.startsWith("Chau ")) {
        const tagABorrar = gamertag.slice(5).trim();
        gamertags = gamertags.filter(tag => tag !== tagABorrar);
        res.json({ message: "Gamertag eliminado." });
    } else if (gamertags.includes(gamertag)) {
        res.json({ message: "Gamertag ya registrado." });
    } else if (gamertags.length < 24) {
        gamertags.push(gamertag);
        res.json({ message: "Buena suerte! Nos vemos en la pista." });
    } else {
        res.json({ message: "Máximo de 24 gamertags alcanzado." });
    }
});

app.post('/api/habilitarEdicion', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD_EDITAR_LISTA) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/api/datos', (req, res) => {
    res.json({ pilotosCarrera1, pilotosCarrera2, pilotosGenerales, puntosGenerales });
});

app.post('/api/datos', (req, res) => {
    const { pilotosCarrera1: p1, pilotosCarrera2: p2, pilotosGenerales: pg, puntosGenerales: ptg } = req.body;
    pilotosCarrera1 = p1;
    pilotosCarrera2 = p2;
    pilotosGenerales = pg;
    puntosGenerales = ptg;
    res.json({ message: "Datos guardados." });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
