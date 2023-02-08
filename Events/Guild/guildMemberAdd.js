const { EmbedBuilder } = require('@discordjs/builders');
const { GuildMember } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",

    execute(member) {
        const { user, guild } = member;
        const welcomeChannel = member.guild.channels.cache.get('CHANNEL_ID_HERE');
        const welcomeMessage = `Selamat Datang di Server Kami, <@${member.id}>! Kami sangat senang bisa berkenalan denganmu. Jangan ragu untuk bertanya dan berinteraksi dengan anggota lain. Kami berharap kamu menikmati waktumu bersama kami! 🎉`;
        const memberRole = 'ROLE_ID_HERE';
        
        const welcomeEmbed = new EmbedBuilder()
            .setTitle('**New Member!**')
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(welcomeMessage)
            .setColor(0x037821)
            .addFields(
                { name: 'Total members', value: `${guild.memberCount}` },
                { name: 'Akun dibuat pada', value: `${member.user.createdAt}` }
            )
            .setTimestamp();

        welcomeChannel.send({
            embeds: [welcomeEmbed]
        });
        member.roles.add(memberRole);
    }
}