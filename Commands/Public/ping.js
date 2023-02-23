const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // hanya diizinkan untuk pengguna admin
    async execute(interaction) {
        const startTime = Date.now();
        const reply = await interaction.reply({ content: "Pinging...", fetchReply: true });
        const endTime = Date.now();
        const latency = endTime - startTime;
        const apiLatency = interaction.client.ws.ping;

        reply.edit({
            content: `🏓 Pong!\nLatency: ${ms(latency, { long: true })}\nAPI Latency: ${ms(apiLatency, { long: true })}`,
            ephemeral: true
        });
    },
};