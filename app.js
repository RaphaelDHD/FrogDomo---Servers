const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());


// Objects
const lights = [
    { id: 1, color: "#F0FC03", active: true },
    { id: 2, color: "#F0FC03", active: true },
    { id: 3, color: "#F0FC03", active: true },
    { id: 4, color: "#F0FC03", active: true }
]


app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur de FrogDomo.');
});

app.get('/lights/:id', (req, res) => {
    const light = lights.find(_search => req.params.id);

    if (light === undefined)
    {
        res.status(404).send("Light with id ${req.params.id} not found");
    }
});

app.listen(PORT, () => {
    console.log("Listen");
})

