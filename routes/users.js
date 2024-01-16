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

    const existingUser = await User.findOne( {email: user.email} )
    
    if (existingUser)
    {
        res.status(401).send(`User with email ${existingUser.email} already exists !`)
    }
    else {
        try {
            const newUser = await user.save()
            res.status(200).send(newUser) 
        }
        catch (error) {
            res.status(400).json(error.message)
        }
    }
})


router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = await User.findOne( {email: email} )

    if (foundUser) {
        if (foundUser.password === password)
        {
            res.status(200).send(foundUser._id.toString())
        }
        else {
            res.status(401).send("Wrong password")
        } 
    }
    else {
        res.status(404).send("No user found")
    } 
})


// Changer les paramètres DEVICE
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            fan: req.body.fan,
            temperature: req.body.temperature,
            light_bulb: req.body.light_bulb,
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


module.exports = router