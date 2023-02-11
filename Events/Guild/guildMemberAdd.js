const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember, Embed, InteractionCollector, Client } = require("discord.js");
const Schema = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";
            let Role = data.Role;

            const { user, guild, client } = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcomeEmbed = new EmbedBuilder()
                .setTitle("**New member!**")
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`Welcome ${user}, ${data.Msg}`)
                .setColor(0x037821)
                .setFooter({
                    text: `${guild.name} - 2023`,
                    iconURL: `${client.user.displayAvatarURL()}`
                })
                .addFields(
                    { name: 'Total members', value: `${guild.memberCount}` },
                    { name: 'Join date', value: `${member.user.createdAt}` }
                )
                .setTimestamp();

            welcomeChannel.send({ embeds: [welcomeEmbed] });
            member.roles.add(data.Role);
        })
    }
}