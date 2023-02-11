const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("Discord ID of the user you want to unban.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setTitle("Succes | ✅")
                .setDescription(`Sucessfully ubanned ${userId} from the guild`)
                .setColor(0x5fb041)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed]
            })
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setTitle("Error | ❌")
                .setDescription("Please provide a valid member ID.")
                .setColor(0xc72c3b)
                .setTimestamp();

            interaction.reply({ embeds: [errEmbed], ephemeral: true })
        }
    }
}