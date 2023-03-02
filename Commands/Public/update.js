// const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName("update")
//         .setDescription("Update the bots presences.")
//         .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//         .addSubcommand(subcommand =>
//             subcommand.setName("activity")
//                 .setDescription("Update the bots activity.")
//                 .addStringOption(option =>
//                     option.setName("type")
//                         .setDescription("Pick an activity.")
//                         .setRequired(true)
//                         .addChoices(
//                             { name: "Playing", value: "Playing" },
//                             { name: "Streaming", value: "Streaming" },
//                             { name: "Listening", value: "Listening" },
//                             { name: "Watching", value: "Watching" },
//                             { name: "Competing", value: "Competing" }
//                         )
//                 )
//                 .addStringOption(option =>
//                     option.setName("activity")
//                         .setDescription("Set your current activity")
//                         .setRequired(true)
//                 )
//         )
//         .addSubcommand(subcommand =>
//             subcommand.setName("status")
//                 .setDescription("Update the bots status.")
//                 .addStringOption(option =>
//                     option.setName("type")
//                         .setDescription("Pick a status.")
//                         .setRequired(true)
//                         .addChoices(
//                             { name: "Online", value: "online" },
//                             { name: "Idle", value: "idle" },
//                             { name: "Do not disturb", value: "dnd" },
//                             { name: "Invisible", value: "invisible" }
//                         )
//                 )
//         ),

//     async execute(interaction, client) {
//         const { options } = interaction;

//         const sub = options.getSubcommand(["activity", "status"]);
//         const type = options.getString("type");
//         const activity = options.getString("activity");

//         const embed = new EmbedBuilder();

//         try {
//             switch (sub) {
//                 case "activity":
//                     switch (type) {
//                         case "Playing":
//                             client.user.setActivity(activity, { type: ActivityType.Playing });
//                             break;
//                         case "Streaming":
//                             client.user.setActivity(activity, { type: ActivityType.Streaming });
//                             break;
//                         case "Listening":
//                             client.user.setActivity(activity, { type: ActivityType.Listening });
//                             break;
//                         case "Watching":
//                             client.user.setActivity(activity, { type: ActivityType.Watching });
//                             break;
//                         case "Competing":
//                             client.user.setActivity(activity, { type: ActivityType.Competing });
//                             break;
//                     }
//                     break;
//                 case "status":
//                     client.user.setPresence({ status: type });
//                     break;

//                 default:
//                     break;
//             }
//         } catch (err) {
//             console.error(err);
//         }

//         return interaction.reply({
//             embeds: [
//                 embed.setDescription(`Succesfully updated your ${sub} to ${type}`)
//                     .setColor("Green")
//                     .setTimestamp()
//             ]
//         });
//     }
// }

const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update the bot presence')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('activity')
                .setDescription('Update the bot activity')
                .addStringOption(option =>
                    option
                        .setName('type')
                        .setDescription('Pick an activity')
                        .setRequired(true)
                        .addChoices(
                            { name: "Playing", value: "Playing" },
                            { name: "Streaming", value: "Streaming" },
                            { name: "Listening", value: "Listening" },
                            { name: "Watching", value: "Watching" },
                            { name: "Competing", value: "Competing" }
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('activity-name')
                        .setDescription('Set your current activity')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Update the bot status')
                .addStringOption(option =>
                    option
                        .setName('type')
                        .setDescription('Pick a status')
                        .setRequired(true)
                        .addChoices(
                            { name: "Online", value: "online" },
                            { name: "Idle", value: "idle" },
                            { name: "Do not disturb", value: "dnd" },
                            { name: "Invisible", value: "invisible" }
                        )
                )
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand(true);
        const type = interaction.options.getString('type', true);
        const activityName = interaction.options.getString('activity-name');

        const embed = new EmbedBuilder().setTimestamp();

        if (subcommand === 'activity') {
            const activityType = ActivityType[type];
            if (!activityType) {
                embed.setDescription(`Invalid activity type "${type}".`);
                embed.setColor("Red");
                return interaction.reply({ embeds: [embed] });
            }

            interaction.client.user.setActivity(activityName, { type: activityType });
            embed.setDescription(`Successfully updated activity to "${type}: ${activityName}".`);
            embed.setColor("Green");
        } else if (subcommand === 'status') {
            interaction.client.user.setStatus(type);
            embed.setDescription(`Successfully updated status to "${type}".`);
            embed.setColor("Green");
        } else {
            embed.setDescription(`Invalid subcommand "${subcommand}".`);
            embed.setColor("Red");
        }

        return interaction.reply({ embeds: [embed] });
    }
};