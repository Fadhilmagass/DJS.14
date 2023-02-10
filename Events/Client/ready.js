const { Client, ModalBuilder } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../../config.json');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('Koneksi ke MongoDB berhasil 🙌');
        }

        console.log(`${client.user.username} is now online 🔛`);
    }
}