const mongoose = require("mongoose");

const LIGHT_BULB_NUMBER = 6;

const lightBulbSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: "#E7F024"
    }
});

const userSchema = new mongoose.Schema({
    // User
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    // Devices
    light_bulbs: {
        type: [lightBulbSchema],
        default: Array.from({ length: LIGHT_BULB_NUMBER }, () => ({
            active: false,
            color: "#E7F024"
        }))
    },

    fan : {
        active : {
            type: Boolean,
            default: false
        },
        speed: {
            type: Number,
            default: 1,
            validate: {
                validator: Number.isInteger,
                message: `Value for fan\'s speed is not an integer.`
            }
        }
    },

    alarm : {
        active: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date
        } 
    },

    temperature : {
        active: {
            type: Boolean,
            default: false
        },
        degree: {
            type: Number,
            default: 20.0
        }

    },

    portal : {
        type: Number,
        default: 0.0
    }
})

module.exports = mongoose.model('User', userSchema);