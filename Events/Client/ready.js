const { Client, ModalBuilder, ActivityType } = require('discord.js')
const mongoose = require('mongoose')
const config = require('../../config.json')
const Levels = require('discord.js-leveling')

module.exports = {
    name: "ready",
    once: true,
    async execute(client, guild) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        })

        if (mongoose.connect) {
            console.log("MongoDB connection successful | ✅");
        }
        console.log(`${client.user.username} is now Online 🚀`);

        Levels.setURL(config.mongodb)

        client.user.setPresence({
            activities: [{
                name: `This Server 👀`,
                type: ActivityType.Watching
            }],
            status: "online"
        })
    },
}