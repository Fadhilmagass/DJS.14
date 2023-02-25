const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Make a suggestion.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of your suggestion.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Describe your suggestion.')
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString('name');
        const description = options.getString('description');

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle('New suggestion')
            .setDescription(`Suggestion by ${member}`)
            .addFields(
                { name: 'Suggestion', value: `${name}` },
                { name: 'Description', value: `${description}` }
            )
            .setFooter({
                text: member.user.tag,
                iconURL: member.user.displayAvatarURL({ dynamic: true })
            });

        const channel = guild.channels.cache.get('1078866066593296485');
        const sentMessage = await channel.send({ embeds: [embed] });
        await sentMessage.react('✅');
        await sentMessage.react('❌');

        interaction.reply({
            content: ':white_check_mark: | Your suggestion has been successfully submitted.',
            ephemeral: true
        });
    }
}