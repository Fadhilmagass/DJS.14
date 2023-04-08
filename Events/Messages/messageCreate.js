const { EmbedBuilder, RequestManager } = require('discord.js')
const Levels = require('discord.js-leveling')
const levels = require('discord.js-leveling/models/levels')

module.exports = {
    name: "messageCreate",

    async execute(message, member) {
        if (!message.guild || message.author.bot) return
        if (message.content.length < 3) return // sending messages like 'ok' or 'no' does not add xp

        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1 // min 1, max 30
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)

        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id)

            const levelEmbed = new EmbedBuilder()
                .setTitle("New Level")
                .setDescription(`**GG** ${message.author}, you just leveled up to level **${user.level + 1}**! 🥳`)
                .setColor("Random")
                .setFooter({ text: `User ID: ${member.user.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()

            const sendEmbed = await message.channel.send({ embeds: [levelEmbed] })
            sendEmbed.react('🥳')
        }
    }
}