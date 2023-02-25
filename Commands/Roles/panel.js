const rrSchema = require('../../Models/ReactionRoles');
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Display reaction role panel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction) {
        const { guildId, guild, channel } = interaction;

        try {
            const data = await rrSchema.findOne({
                GuildID: guildId
            });

            if (!data || data.roles.length === 0) {
                return interaction.reply({
                    content: "This server does not have any data.", ephemeral: true
                });
            }

            const roleOptions = data.roles.map((rr) => {
                const role = guild.roles.cache.get(rr.roleId);
                return {
                    label: role.name,
                    value: rr.roleId,
                    description: rr.roleDescription || "No description provided.",
                    emoji: rr.roleEmoji || undefined
                };
            });

            const selectMenu = new SelectMenuBuilder()
                .setCustomId('reaction-roles')
                .setMaxValues(roleOptions.length)
                .addOptions(roleOptions);

            const row = new ActionRowBuilder().addComponents(selectMenu);

            const panelEmbed = new EmbedBuilder()
                .setDescription("Please select a role below.")
                .setColor("Aqua")

            const sentMessage = await channel.send({
                embeds: [panelEmbed],
                components: [row]
            });

            return interaction.reply({
                content: "Successfully sent your panel.",
                ephemeral: true
            });

        } catch (err) {
            console.error(err);
        }
    }
}