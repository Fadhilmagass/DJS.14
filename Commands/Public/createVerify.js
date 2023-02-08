const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createverify')
        .setDescription('Buat verifikasi channel anda')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Kirim embed verifikasi ke channel ini')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
            .setTitle('Verifikasi')
            .setDescription('Silakan klik tombol "Verifikasi" di bawah untuk melanjutkan.')
            .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verifikasi').setStyle(ButtonStyle.Success)
                )
            ]
        });
        if (!sendChannel) {
            return interaction.reply({
                content: 'Terjadi error! Coba lagi nanti.', ephemeral: true
            });
        } else {
            return interaction.reply({
                content: 'Channel verifikasi berhasil dibuat!', ephemeral: true
            });
        }
    }
}