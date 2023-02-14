const { ChannelType, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../Models/Ticket');
const TicketSetup = require('../../Models/TicketSetup');

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } = PermissionFlagsBits;
        const ticketId = Math.floor(Math.random() * 9000) + 10000;

        if (!interaction.isButton()) return;

        const data = await TicketSetup.findOne({ GuildID: guild.id });

        if (!data)
            return;

        if (!data.Buttons.includes(customId))
            return;

        if (!guild.members.me.permissions.has(ManageChannels))
            interaction.reply({ content: "I don't have permissions for this.", ephemeral: true });

        try {
            await guild.channels.create({
                name: `${member.user.username}-ticket${ticketId}`,
                type: ChannelType.GuildText,
                parent: data.Category,
                permissionOverwrites: [
                    {
                        id: data.Everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                ],
            }).then(async (channel) => {
                const newTicketSchema = await ticketSchema.create({
                    GuildID: guild.id,
                    MembersID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: customId,
                    Claimed: false
                })
                const embed = new EmbedBuilder()
                    .setTitle(`${guild.name} - Ticket: ${customId}`)
                    .setDescription("Our team will contact you shrotly. Please describe your issue.")
                    .setFooter({ text: `${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId("close").setLabel('Close ticket').setStyle(ButtonStyle.Primary).setEmoji('❌'),
                    new ButtonBuilder().setCustomId("lock").setLabel('Lock the ticket').setStyle(ButtonStyle.Secondary).setEmoji('🔐'),
                    new ButtonBuilder().setCustomId("unlock").setLabel('Unlock the ticket').setStyle(ButtonStyle.Success).setEmoji('🔓'),
                    new ButtonBuilder().setCustomId("claim").setLabel('Claim').setStyle(ButtonStyle.Secondary).setEmoji('🛄'),
                );

                channel.send({
                    embeds: ([embed]),
                    components: [
                        button
                    ]
                });

                interaction.reply({ content: "Succesfully created a ticket.", ephemeral: true });
            });
        } catch (err) {
            return console.log(err);
        }
    }
}