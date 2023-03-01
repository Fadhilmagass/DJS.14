const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const suggestionSchema = require('../../Models/Suggestion');

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const { member, guildId, customId, message } = interaction;

        if (!interaction.isButton()) return;

        if (customId == "suggest-accept" || customId == "suggest-decline") {
            if (!member.permissions.has(PermissionFlagsBits.Administrator))
                return interaction.reply({ content: "You do not have permission for that.", ephemeral: true });

            suggestionSchema.findOne({ GuildID: guildId, MessageID: message.id }, async (err, data) => {
                if (err) {
                    throw err;
                }

                if (!data) {
                    return interaction.reply({ content: "No data was found.", ephemeral: true });
                }

                const embed = message.embeds[0];

                if (!embed) {
                    return interaction.reply({ content: "No embed was found.", ephemeral: true })
                }

                switch (customId) {
                    case "suggest-accept":
                        embed.data.fields[2] = { name: "Status", value: "Accepted", inline: true }
                        const acceptedEmbed = EmbedBuilder.from(embed).setColor("Green");

                        message.edit({ embeds: [acceptedEmbed] });
                        interaction.reply({ content: "Suggestion succesfully accepted.", ephemeral: true });
                        break;
                    case "suggest-decline":
                        embed.data.fields[2] = { name: "Status", value: "Declined", inline: true }
                        const declinedEmbed = EmbedBuilder.from(embed).setColor("Red");

                        message.edit({ embeds: [declinedEmbed] });
                        interaction.reply({ content: "Suggestion succesfully declined.", ephemeral: true });
                        break;

                    default:
                        break;
                }
            })
        }
    }
}