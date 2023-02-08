const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Membersihkan jumlah pesan secara spesifik dari target atau channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('jumlah')
                .setDescription('Jumlah pesan untuk dibersihkan')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Pilih target yang akan dibersihkan pesannya.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('jumlah');
        const target = options.getUser("target");

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Berhasil dihapus ${messages.size} pesan dari ${target}`);
                interaction.reply({
                    embeds: [res]
                    // Bisa ditambahin ephemeral kalo mau :)
                });
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Berhasil dihapus ${messages.size} pesan dari channel ini.`)
                interaction.reply({
                    embeds: [res]
                    // Bisa ditambahin ephemeral kalo mau :)
                });
            });
        }
    }
}