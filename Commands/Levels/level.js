const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("Adjust a user's levels.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand.setName("add")
                .setDescription("Add levels to a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of levels.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("remove")
                .setDescription("Remove levels from a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of levels.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("set")
                .setDescription("Set a user's levels.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of levels.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const { options, guildId } = interaction

        const sub = options.getSubcommand()
        const target = options.getUser("target")
        const amount = options.getInteger("amount")
        const embed = new EmbedBuilder()

        try {
            switch (sub) {
                case "add":
                    await Levels.appendLevel(target.id, guildId, amount)
                    embed.setTitle('Level Added')
                        .setDescription(`Added ${amount} level(s) to ${target}.`)
                        .setColor("Green")
                        .setTimestamp()
                    break
                case "remove":
                    await Levels.subtractLevel(target.id, guildId, amount)
                    embed.setTitle('Level Removed')
                        .setDescription(`Removed ${amount} level(s) to ${target}.`)
                        .setColor("Red")
                        .setTimestamp()
                    break
                case "set":
                    await Levels.setLevel(target.id, guildId, amount)
                    embed.setTitle('Level Setted')
                        .setDescription(`Set ${target} level(s) to ${amount}.`)
                        .setColor("DarkGreen")
                        .setTimestamp()
                    break
            }
        } catch (err) {
            console.error(err)
        }

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}