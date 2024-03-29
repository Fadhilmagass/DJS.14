const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Get info about someone's rank.")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("Select a user")
        ),

    async execute(interaction) {
        const { options, guildId, user } = interaction

        const member = options.getMember("user") || user

        const levelUser = await Levels.fetch(member.id, guildId)

        const embed = new EmbedBuilder()

        if (!levelUser) return interaction.reply({ content: "Seems like this user has not earned any xp so far.", ephemeral: true })

        embed.setDescription(`**${member}** is currently level ${levelUser.level + 1} and has ${levelUser.xp.toLocaleString()} xp.`)
            .setColor("Random")
            .setFooter({
                text: `${member.id}`, iconURL: user.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}