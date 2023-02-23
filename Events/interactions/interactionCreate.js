const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",

    execute(interaction, client) {
        const { customId, values, guild, member } = interaction;
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                interaction.reply({ content: "outdated command" });
            }

            command.execute(interaction, client);
        } else if (interaction.isButton()) {
            const { customId } = interaction;

            if (customId == "verify") {
                const role = interaction.guild.roles.cache.get("863732349774331934");
                return interaction.member.roles.add(role).then((member) =>
                    interaction.reply({
                        content: `${role} telah diberikan kepada anda.`,
                        ephemeral: true,
                    })
                );
            }
        } else if (interaction.isSelectMenu()) {
            if (customId == "reaction-roles") {
                for (let i = 0; i < values.length; i++) {
                    const roleId = values[i];

                    const role = guild.roles.cache.get(roleId);
                    const hasRole = member.roles.cache.has(roleId);

                    switch (hasRole) {
                        case true:
                            member.roles.remove(roleId);
                            break;
                        case false:
                            member.roles.add(roleId);

                        default:
                            break;
                    }
                }

                interaction.reply({
                    content: "Roles updated.", ephemeral: true
                });
            }
        } else {
            return;
        }
    },
};