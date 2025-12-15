const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const configSchema = require('../../schemas/configSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('painel')
        .setDescription('Envia o painel de tickets')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const { guild } = interaction;
        const config = await configSchema.findOne({ GuildID: guild.id });

        const embed = new EmbedBuilder()
            .setTitle(config?.PanelTitle || 'Atendimento')
            .setDescription(config?.PanelDescription || 'Abra um ticket para falar com o suporte.')
            .setColor('#2b2d31');

        if (config?.PanelImage) {
            embed.setImage(config.PanelImage);
        }

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket_open')
                    .setLabel('Abrir Ticket')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('📩')
            );

        await interaction.reply({ content: 'Painel enviado!', ephemeral: true });
        await interaction.channel.send({ embeds: [embed], components: [button] });
    },
};