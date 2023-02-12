const { Client, ModalBuilder, ActivityType } = require('discord.js')
const mongoose = require('mongoose')
const config = require('../../config.json')

module.exports = {
    name: "ready",
    once: true,
    async execute(client, guild) {
        mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        }).catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });

        if (mongoose.connect) {
            console.log("MongoDB connection successful | ✅");
        }

        console.log(`${client.user.username} is now Online 🚀`);

        client.user.setPresence({
            activities: [{
                name: `This Server 👀`,
                type: ActivityType.Watching
            }],
            status: "online"
        })
    },
}