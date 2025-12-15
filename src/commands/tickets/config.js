const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Painel de configuração dos tickets')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Configuração dos Tickets')
            .setDescription('Use os botões para editar os textos e imagens.')
            .setColor('#2b2d31');

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('btn_config_panel')
                    .setLabel('Painel Principal')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('📋'),
                
                new ButtonBuilder()
                    .setCustomId('btn_config_ticket')
                    .setLabel('Mensagem do Ticket')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('💬'),

                new ButtonBuilder()
                    .setCustomId('btn_preview')
                    .setLabel('Preview')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('👁️')
            );

        await interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
    },
};