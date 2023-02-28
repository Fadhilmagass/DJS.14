const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const warningSchema = require('../../Models/Warning');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warnings")
        .setDescription("Fully complete warning system.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addSubcommand(subcommand =>
            subcommand.setName("add")
                .setDescription("Add a warning to user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("reason")
                        .setDescription("Provide a reason.")
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option.setName("evidence")
                        .setDescription("Provide evidence.")
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("check")
                .setDescription("Check warnings of a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("remove")
                .setDescription("Remove warnings of a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("id")
                        .setDescription("Provide the warning's id.")
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("clear")
                .setDescription("Clear all warnings from a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
        ),

    async execute(interaction) {
        const { options, guildId, user, member } = interaction;

        const sub = options.getSubcommand(["add", "check", "remove", "clear"]);
        const target = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided.";
        const evidence = options.getString("evidence") || "None provided.";
        const warnId = options.getString("id") - 1;
        const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

        const userTag = `${target.username}#${target.discriminator}`;

        const embed = new EmbedBuilder();

        switch (sub) {
            case "add":
                try {
                    const data = await warningSchema.findOne({
                        GuildID: guildId,
                        UserID: target.id,
                        UserTag: userTag,
                    });
                    const warnContent = {
                        ExecuterId: user.id,
                        ExecuterTag: user.tag,
                        Reason: reason,
                        Evidence: evidence,
                        Date: warnDate,
                    };
                    if (!data) {
                        const newData = new warningSchema({
                            GuildID: guildId,
                            UserID: target.id,
                            UserTag: userTag,
                            Content: [warnContent],
                        });
                        await newData.save();
                    } else {
                        data.Content.push(warnContent);
                        await data.save();
                    }
                    embed.setColor("Green")
                        .setDescription(
                            `Warning added: ${userTag} | ||${target.id}||\n**Reason**: ${reason}\n**Evidence**: ${evidence}`
                        )
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp();
                    interaction.reply({ embeds: [embed] });
                } catch (err) {
                    console.error(err);
                    interaction.reply({
                        content: "An error occurred while processing your command.",
                        ephemeral: true,
                    });
                }
                break;
            case "check":
                try {
                    const data = await warningSchema.findOne({
                        GuildID: guildId,
                        UserID: target.id,
                        UserTag: userTag,
                    });
                    if (data) {
                        const content = data.Content
                            .map(
                                (w, i) =>
                                    `**ID**: ${i + 1}\n**By**: ${w.ExecuterTag}\n**Date**: ${w.Date}\n**Reason**: ${w.Reason}\n**Evidence**: ${w.Evidence}\n\n`
                            )
                            .join(" ");
                        embed.setColor("Green")
                            .setDescription(content)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp();
                        interaction.reply({ embeds: [embed] });
                    } else {
                        embed.setColor("Red")
                            .setDescription(`${userTag} | ||${target.id}|| has no warnings.`)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp();
                        interaction.reply({ embeds: [embed] });
                    }
                } catch (err) {
                    console.error(err);
                    interaction.reply({
                        content: "An error occurred while processing your command.",
                        ephemeral: true,
                    });
                }
                break;
            case "remove":
                try {
                    const data = await warningSchema.findOne({
                        GuildID: guildId,
                        UserID: target.id,
                        UserTag: userTag,
                    });
                    if (data) {
                        data.Content.splice(warnId, 1);
                        await data.save();
                        embed.setColor("Red")
                            .setDescription(`${userTag}'s warning id: ${warnId + 1} has been removed.`)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp();
                        interaction.reply({ embeds: [embed] });
                    } else {
                        embed.setColor("Red")
                            .setDescription(`${userTag} | ||${target.id}|| has no warnings.`)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp();
                        interaction.reply({ embeds: [embed] });
                    }
                } catch (err) {
                    console.error(err);
                    interaction.reply({
                        content: "An error occurred while processing your command.",
                        ephemeral: true,
                    });
                }
                break;
            case "clear":
                try {
                    const data = await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: userTag });
                    if (data) {
                        embed.setColor("Red")
                            .setDescription(`${userTag}'s warnings were cleared | ||${target.id}||.`)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp();
                    } else {
                        embed.setColor("Red")
                            .setDescription(`${userTag} | ||${target.id}|| has no warnings.`)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp();
                    }
                    interaction.reply({ embeds: [embed] });
                } catch (err) {
                    console.error(err);
                    interaction.reply("There was an error while trying to clear the warnings.");
                }
                break;

            default:
                break;
        }
    }
}