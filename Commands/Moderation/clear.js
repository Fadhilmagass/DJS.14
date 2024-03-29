const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears a specific number of messages from a target or channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to clear')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Select the target to clear messages from.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');
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
                res.setDescription(`Successfully deleted ${messages.size} message from ${target}`);
                interaction.reply({
                    embeds: [res]
                    // Bisa ditambahin ephemeral kalo mau :)
                });
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Successfully removed ${messages.size} messages from this channel.`)
                interaction.reply({
                    embeds: [res]
                    // Bisa ditambahin ephemeral kalo mau :)
                });
            });
        }
    }
}