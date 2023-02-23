const rrSchema = require('../../Models/ReactionRoles');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addrole")
        .setDescription("Add custom reaction role.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Role to be assigned")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Description of the role.")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("emoji")
                .setDescription("Emoji for the role.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const { options, guildId, member } = interaction;

        const role = options.getRole("role");
        const description = options.getString("description") || "No description.";
        const emoji = options.getString("emoji") || "";

        try {
            if (!role) {
                return interaction.reply({
                    content: "Please provide a valid role.",
                    ephemeral: true
                });
            }

            if (role.position >= member.roles.highest.position) {
                return interaction.reply({
                    content: "I don't have permissions for that.",
                    ephemeral: true
                });
            }

            let data = await rrSchema.findOne({ GuildID: guildId });

            const newRole = {
                roleId: role.id,
                roleDescription: description,
                roleEmoji: emoji,
            };

            if (data) {
                const roleIndex = data.roles.findIndex(x => x.roleId === role.id);
                if (roleIndex === -1) {
                    data.roles.push(newRole);
                } else {
                    data.roles[roleIndex] = newRole;
                }
            } else {
                data = await rrSchema.create({ GuildID: guildId, roles: [newRole] });
            }

            await data.save();

            return interaction.reply({
                content: `Created new role **${role.name}**`,
            });

        } catch (err) {
            console.log(err);
        }
    }
};