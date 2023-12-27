const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user)
        {
            res.status(404).json(`User with id ${req.params.id} not found`);
        }
        else {
            res.status(200).send(user);
        }
    }
    catch(error)
    {
        res.status(500).send(error.message)
    }
   
});


router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(200).send(newUser) 
    }
    catch (error) {
        res.status(400).json(error.message)
    }
})

// Changer les paramètres DEVICE
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            fan: req.body.fan,
            temperature: req.body.temperature,
            light_bulbs: req.body.light_bulbs,
            alarm: req.body.alarm,
            portal: req.body.portal
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Changer la couleur d'une lampe en particulier
router.put('/:userId/lightbulb/:lightbulbId', async (req, res) => {
    const { userId, lightbulbId } = req.params;
    const { color } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, "light_bulbs._id": lightbulbId }, // Filtrer l'utilisateur et la lampe spécifique
            { $set: { "light_bulbs.$.color": color } }, // Mettre à jour la couleur de la lampe spécifique
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur ou lampe non trouvée' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router