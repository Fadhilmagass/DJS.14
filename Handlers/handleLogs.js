const { EmbedBuilder } = require("discord.js");

function handleLogs(client) {
    const logSchema = require("../Models/Logs");

    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data || !data.Channel) return;
            const LogChannel = client.channels.cache.get(data.Channel);

            if (!LogChannel) return;
            embed.setTimestamp();

            try {
                LogChannel.send({ embeds: [embed] });
            } catch (err) {
                console.error(err);
            }
        });
    }

    client.on("messageDelete", function (message) {
        if (message.author.bot) return;

        const embed = new EmbedBuilder()
            .setTitle('❌ Message Deleted')
            .setColor('Red')
            .setDescription(`Oops! Looks like someone accidentally deleted a message.`)
            .addFields(
                { name: '**Author**:', value: `<@${message.author.id}> - *${message.author.id}*` },
                { name: '**Date**:', value: `** ${message.createdAt.toLocaleDateString()} **` },
                { name: '**Channel**:', value: `*<#${message.channel.id}> - ${message.channel.id}*` },
                { name: '**Deleted Message**:', value: `**\`\`\`${message.content.replace(/`/g, "'")}\`\`\`` }
            )

        return send_log(message.guild.id, embed);
    });

    // Channel Topic Updating 
    client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {

        const embed = new EmbedBuilder()
            .setTitle('🛠️ Channel Topic Updated!')
            .setColor('Blue')
            .setDescription(`The topic of ${channel} has been changed from.`)
            .addFields(
                { name: "Old topics:", value: `${oldTopic}`, inline: false },
                { name: "New topic:", value: `${newTopic}`, inline: false }
            )
            .setFooter({ text: `${channel.guild.name} | ${channel.id}` });

        return send_log(channel.guild.id, embed);

    });

    // Channel Permission Updating
    client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
        const embed = new EmbedBuilder()
            .setTitle('🛡️ Permission Updated')
            .setColor('Green')
            .setDescription(`Permissions in ${channel} has been updated.`)
            .setFooter({ text: `${channel.guild.name} | ${channel.id}` });

        return send_log(channel.guild.id, embed);
    });


    // unhandled Guild Channel Update
    client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('🔄 Channel Updated!')
            .setColor('Yellow')
            .setDescription(`A channel(${oldChannel}) in ${oldChannel.guild.name} was edited, but the updates were not specified.`)
            .addFields(
                { name: "Old Channel Name", value: `\`${oldChannel.name}\``, inline: true },
                { name: "New Channel Name", value: `\`${newChannel.name}\``, inline: true }
            )
            .setFooter({ text: `Channel ID: ${oldChannel.id}` });

        return send_log(oldChannel.guild.id, embed);

    });

    // Member Started Boosting
    client.on("guildMemberBoost", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('🚀 User Started Boosting!')
            .setColor('Pink')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`🎉 **${member.user.tag}** has started boosting  ${member.guild.name}! Thank you for your support! 🎉`)
            .setFooter({ text: "Boosting started at" });
        return send_log(member.guild.id, embed);

    })

    // Member Unboosted
    client.on("guildMemberUnboost", (member, oldLevel) => {
        const totalBoosts = member.guild.premiumSubscriptionCount;

        let color;
        if (oldLevel === 2) {
            color = 'Gold';
        } else if (oldLevel === 1) {
            color: 'Blue';
        } else {
            color = 'Red';
        }

        const embed = new EmbedBuilder()
            .setTitle('🚫 User Stopped Boosting!')
            .setColor(color)
            .setDescription(`**${member.user.tag}** has stopped boosting  ${member.guild.name} and lost the ${oldLevel} boost reward!`)
            .addFields(
                { name: `**Total boosts**:`, value: `${totalBoosts}` }
            )

        return send_log(member.guild.id, embed);

    })

    // Member Got Role
    client.on("guildMemberRoleAdd", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('🎉 User Got a Role!')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('Green')
            .setDescription(`👤 **${member.user.tag}** got the role **\`${role.name}\`**`)
            .setFooter({ text: 'Role added at' })

        return send_log(member.guild.id, embed);

    })

    // Member Lost Role
    client.on("guildMemberRoleRemove", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('🚫 User Lost Role!')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('Red')
            .setDescription(`👤 **${member.user.tag}** lost the role **\`${role.name}\`**`)
            .setFooter({ text: 'Role removed at' })

        return send_log(member.guild.id, embed);

    })

    // Nickname Changed
    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

        const embed = new EmbedBuilder()
            .setTitle('🔄 Nickname Updated')
            .setColor('Green')
            .setDescription(`${member} changed their nickname`)
            .addFields(
                { name: 'From:', value: `${oldNickname}` },
                { name: 'To:', value: `${newNickname}` }
            )
            .setFooter({ text: `User ID: ${member.user.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })

        return send_log(member.guild.id, embed);

    })

    // Member Joined
    client.on("guildMemberAdd", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('👤 User Joined')
            .setColor('Green')
            .setDescription(`**Member**: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
                member.user.displayAvatarURL({ dynamic: true }));

        return send_log(member.guild.id, embed);

    });

    // Member left
    client.on("guildMemberRemove", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('👋 User Left')
            .setColor('Red')
            .setDescription(`**Member**: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
                member.user.displayAvatarURL({ dynamic: true }));

        return send_log(member.guild.id, embed);

    });

    // Server Boost Level Up
    client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle(`🚀 Server Boost Level Up`)
            .setColor('Pink')
            .setFooter({ text: 'Boost level changed at' })
            .setDescription(`Woohoo! **${guild.name}** just reached Boost Level ${newLevel} 🎉`);

        return send_log(guild.id, embed);

    })

    // Server Boost Level Down
    client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle('🚀 Server Boost Level Down')
            .setColor('DarkPurple')
            .addFields(
                { name: 'Boosters', value: `Now **${guild.premiumSubscriptionCount}** boosters are supporting the server!` },
                { name: 'Current Perks', value: `Server features at this level: ${guild.premiumTier}\nCheck the server's Boost status for more info!` }
            )
            .setDescription(`Unfortunately, ${guild.name} lost a level from **${oldLevel}** to **${newLevel}**.\n`)
            .setFooter({ text: 'Boost level changed at' });

        return send_log(guild.id, embed);

    })

    // Banner Added
    client.on("guildBannerAdd", (guild, bannerURL) => {

        const embed = new EmbedBuilder()
            .setTitle('🆕 Server Has a New Banner!')
            .setColor('Green')
            .setImage(bannerURL)
            .setFooter({ text: `Guild ID: ${guild.id}` })

        return send_log(guild.id, embed);

    })

    // AFK Channel Added
    client.on("guildAfkChannelAdd", (guild, afkChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('🆕 New AFK Channel Added')
            .setColor('Green')
            .setDescription('A new AFK channel named ' + `${afkChannel}` + ' was added to the server ' + `${guild}`)
            .setFooter({ text: 'Channel created at' })

        return send_log(guild.id, embed);

    })

    // Guild Vanity Add
    client.on("guildVanityURLAdd", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('🔗 Vanity Link Added')
            .setColor('Green')
            .setDescription(`🎉 ${guild.name} just got a custom vanity URL! Check it out at ${vanityURL} 🎉`)
            .setFooter({ text: `Guild ID: ${guild.id}` })

        return send_log(guild.id, embed);

    })

    // Guild Vanity Remove
    client.on("guildVanityURLRemove", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('🛑 Vanity Link Removed')
            .setColor('Red')
            .setDescription(`It's the end of an era for ${guild.name}'s vanity URL, as ${vanityURL} has been removed.`)
            .setFooter({ text: `Guild ID: ${guild.id}` })

        return send_log(guild.id, embed);

    })

    // Guild Vanity Link Updated
    client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('🔄 Vanity Link Updated')
            .setColor('Green')
            .setDescription(`🔗 The vanity URL of ${guild.name} has been updated from \`${oldVanityURL}\` to \`${newVanityURL}\``)
            .setFooter({ text: `Guild ID: ${guild.id}` })

        return send_log(guild.id, embed);

    })

    // Message Pinned
    client.on("messagePinned", (message) => {

        const embed = new EmbedBuilder()
            .setTitle('📌 Message Pinned')
            .setColor('Grey')
            .setDescription(`📌 ${message} has been pinned by ${message.author}`)
            .setFooter({ text: 'Message pinned at' })

        return send_log(message.guild.id, embed);

    })

    // Message Edited
    client.on("messageContentEdited", (message, oldContent, newContent) => {

        const embed = new EmbedBuilder()
            .setTitle('♻ Message Edited')
            .setColor('DarkOrange')
            .setDescription(`⚡ **BOOM!** ⚡ \n${message.author}'s message was edited!`)
            .addFields(
                { name: '**Old Message**:', value: `${oldContent}` },
                { name: '**New Message**:', value: `${newContent}` }
            )
            .setFooter({ text: `Guild ID: ${message.guild.id}` })

        return send_log(message.guild.id, embed);

    })

    // Role Position Updated
    client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {

        const embed = new EmbedBuilder()
            .setTitle('🔄 Role Position Updated')
            .setColor('Green')
            .setDescription(`The position of ${role} role was changed from ${oldPosition} to ${newPosition}.`)
            .setFooter({ text: `Role ID: ${role.id}` })

        return send_log(role.guild.id, embed);

    })

    // Role Permission Updated
    client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {

        const embed = new EmbedBuilder()
            .setTitle('🔄 Role Permission Updated')
            .setColor('Green')
            .setDescription(`${role} had as permissions ${oldPermissions} and now has as permissions ${newPermissions}`)
            .setFooter({ text: `Role ID: ${role.id}` })

        return send_log(role.guild.id, embed);

    })

    // Discriminator Updated
    client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {

        const embed = new EmbedBuilder()
            .setTitle('🔄 Discriminator Updated')
            .setColor('Green')
            .setDescription(`${user} updated their discriminator from ${oldDiscriminator} to ${newDiscriminator}`)
            .setFooter({ text: `User ID: ${user.id}` });

        return send_log(user.guild.id, embed);

    })

    // Joined VC
    client.on("voiceChannelJoin", (member, channel) => {

        const embed = new EmbedBuilder()
            .setTitle(`🔊 ${member.user.tag} Joined a Voice Channel`)
            .setColor('Blue')
            .setDescription(member.user.tag + ' joined the voice channel ' + `${channel}`)
            .setFooter(
                { text: `User ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) }
            )

        return send_log(member.guild.id, embed);

    })

    // Left VC
    client.on("voiceChannelLeave", (member, channel) => {

        const embed = new EmbedBuilder()
            .setTitle(`🔊 ${member.user.tag} Left Voice Channel`)
            .setColor('Red')
            .setDescription(member.user.tag + ' left the voice channel ' + `${channel}`)
            .setFooter(
                { text: `User ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) }
            )

        return send_log(member.guild.id, embed);

    })

    // VC Switch
    client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {

        const embed = new EmbedBuilder()
            .setTitle(`🔊 ${member.user.tag} Moved Voice Channel`)
            .setColor('Green')
            .addFields(
                { name: 'From Channel:', value: `${oldChannel}` },
                { name: 'To Channel:', value: `${newChannel}` }
            )
            .setFooter(
                { text: `User ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) }
            )

        return send_log(member.guild.id, embed);

    })

    // VC Mute
    client.on("voiceChannelMute", (member, muteType) => {

        const embed = new EmbedBuilder()
            .setTitle('🔇 User Muted')
            .setColor('Red')
            .setDescription(`${member} has been muted! (type: ${muteType})`)
            .setFooter({ text: `Member ID: ${member.user.id}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` });

        return send_log(member.guild.id, embed);

    })

    // VC Unmute
    client.on("voiceChannelUnmute", (member, oldMuteType) => {

        const embed = new EmbedBuilder()
            .setTitle('🔊 User Unmuted')
            .setColor('Green')
            .setDescription(`${member} has been unmuted! (type: ${oldMuteType})`)
            .setFooter({ text: `Member ID: ${member.user.id}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` });

        return send_log(member.guild.id, embed);

    })

    // VC Defean
    client.on("voiceChannelDeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setTitle('🧏‍♂️ User Deafend')
            .setColor('Red')
            .setDescription(`${member} has been deafed! (type: ${deafType})`)
            .setFooter({ text: `Member ID: ${member.user.id}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` });

        return send_log(member.guild.id, embed);

    })

    // VC Undefean
    client.on("voiceChannelUndeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setTitle('🗣 User Undeafend')
            .setColor('Green')
            .setDescription(`${member} has been undeafend! (type: ${deafType})`)
            .setFooter({ text: `Member ID: ${member.user.id}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` });

        return send_log(member.guild.id, embed);

    })

    // User Started to Stream
    client.on("voiceStreamingStart", (member, voiceChannel) => {


        const embed = new EmbedBuilder()
            .setTitle(`📽 ${member} Started to Stream`)
            .setColor('Green')
            .setDescription(`started streaming in ${voiceChannel}`)
            .setFooter({ text: `${member.id}` })

        return send_log(member.guild.id, embed);

    })

    // User Stopped to Stream
    client.on("voiceStreamingStop", (member, voiceChannel) => {


        const embed = new EmbedBuilder()
            .setTitle(`🛑 ${member} Stopped to Stream`)
            .setColor('Red')
            .setDescription(`stopped streaming in ${voiceChannel}`)
            .setFooter({ text: `User ID: ${member.user.id}` })

        return send_log(member.guild.id, embed);
    });

    // Role Created
    client.on("roleCreate", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('🆕 Role Added')
            .setColor('Green')
            .setDescription("Let's celebrate the addition of a new role!🥂")
            .addFields(
                { name: 'Role:', value: `${role}` },
                { name: 'Role name:', value: `${role.name}` },
                { name: 'Role ID:', value: `${role.id}` },
                { name: 'HEX code:', value: `${role.hexColor}` },
                { name: 'Position:', value: `${role.position}` }
            )
            .setFooter({ text: `${role.guild.name}` })

        return send_log(role.guild.id, embed);

    });

    // Role Deleted
    client.on("roleDelete", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('❌ Role Deleted')
            .setColor('Red')
            .setDescription("Let's have a moment of silence for the deleted role 🔕")
            .addFields(
                { name: 'Role:', value: `${role}` },
                { name: 'Role name:', value: `${role.name}` },
                { name: 'Role ID:', value: `${role.id}` },
                { name: 'HEX code:', value: `${role.hexColor}` },
                { name: 'Position:', value: `${role.position}` }
            )
            .setFooter({ text: `${role.guild.name}` })

        return send_log(role.guild.id, embed);

    });

    // User Banned
    client.on("guildBanAdd", ({ guild, user }) => {

        const embed = new EmbedBuilder()
            .setTitle('‼ User Banned')
            .setColor('Red')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription("The user has been banned from the server.")
            .addFields(
                { name: 'User:', value: `${user}` },
                { name: 'User ID:', value: `${user.id}` },
                { name: 'User Tag:', value: `${user.tag}` }

            )
            .setFooter({ text: `Guild ID: ${guild.id}` })

        return send_log(guild.id, embed);

    });

    // User Unbanned
    client.on("guildBanRemove", ({ guild, user }) => {

        const embed = new EmbedBuilder()
            .setTitle('✅ User Unbanned')
            .setColor('Green')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User:', value: `${user}` },
                { name: 'User ID:', value: `${user.id}` },
                { name: 'User Tag:', value: `${user.tag}` }

            )
            .setFooter({ text: `Guild ID: ${guild.id}` })

        return send_log(guild.id, embed);

    });

    // Channel Created
    client.on("channelCreate", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('✅ Channel Created')
            .setColor('Green')
            .setDescription('Channel has been created.')
            .addFields(
                { name: 'Channel name:', value: `${channel}` },
                { name: 'Channel ID:', value: `${channel.id}` }
            )
            .setFooter({ text: 'Channel created at' })

        return send_log(channel.guild.id, embed);

    });

    // Channel Deleted
    client.on("channelDelete", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('❌ Channel Deleted')
            .setColor('Red')
            .setDescription('Channel has been deleted.')
            .addFields(
                { name: 'Channel name:', value: `${channel}` },
                { name: 'Channel ID:', value: `${channel.id}` }
            )
            .setFooter({ text: 'Channel created at' })

        return send_log(channel.guild.id, embed);

    });
}

module.exports = { handleLogs };