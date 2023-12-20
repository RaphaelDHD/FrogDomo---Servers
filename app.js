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
];


const fan = { 
    active: false,
    speed: 0
}


const temperature = {
    active: false,
    temperature: 20.0
} 

const portal = {
    degree: 0.0
}


// GET

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur de FrogDomo.');
});


app.get('/lights/:id', (req, res) => {
    const light = lights.find(_search => _search.id === parseInt(req.params.id));

    if (!light)
    {
        res.status(404).send(`Light with id ${req.params.id} not found`);
    }
    else {
        res.status(200).send(light);
    } 
});


app.get('/fan', (req, res) => {
    res.status(200).send(fan);
});


app.get('/temperature', (req, res) => {
    res.status(200).send(temperature);
});


app.get('/portal', (req, res) => {
    res.status(200).send(portal);
});


// PUT

app.put('/lights/:id', (req, res) =>{
    const light = lights.find(_search => _search.id === parseInt(req.params.id));

    if (!light) {
        return res.status(404).send(`Light with id ${req.params.id} not found`);
    }

    if (req.body.color) {
        light.color = req.body.color;
    }
    if (req.body.active !== undefined) {
        light.active = req.body.active;
    }

    res.status(200).send(light);
});

app.put('/fan', (req, res) => {
    if (req.body.active !== undefined) {
        fan.active = req.body.active
    }
    if (req.body.speed !== undefined) {
        fan.speed = req.body.speed;
    }

    res.status(200).send(fan);
});

app.put('/portal', (req, res) => {
    if (req.body.degree !== undefined) {
        portal.degree = req.body.degree
    }

    res.status(200).send(portal);
});

app.listen(PORT, () => {
    console.log("Listen");
});

