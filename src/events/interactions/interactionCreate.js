const { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ticketSchema = require('../../schemas/ticketSchema');
const configSchema = require('../../schemas/configSchema');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
            return;
        }

        if (interaction.isButton()) {
            const { customId, guild, member } = interaction;

            if (customId === 'btn_config_panel') {
                const modal = new ModalBuilder()
                    .setCustomId('modal_config_panel')
                    .setTitle('Editar Painel Principal');

                const titleInput = new TextInputBuilder()
                    .setCustomId('input_panel_title')
                    .setLabel('Título')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const descInput = new TextInputBuilder()
                    .setCustomId('input_panel_desc')
                    .setLabel('Descrição')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(false);

                const imgInput = new TextInputBuilder()
                    .setCustomId('input_panel_img')
                    .setLabel('URL da Imagem')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                modal.addComponents(
                    new ActionRowBuilder().addComponents(titleInput),
                    new ActionRowBuilder().addComponents(descInput),
                    new ActionRowBuilder().addComponents(imgInput)
                );

                await interaction.showModal(modal);
            }

            if (customId === 'btn_config_ticket') {
                const modal = new ModalBuilder()
                    .setCustomId('modal_config_ticket')
                    .setTitle('Editar Mensagem do Ticket');

                const titleInput = new TextInputBuilder()
                    .setCustomId('input_ticket_title')
                    .setLabel('Título')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const descInput = new TextInputBuilder()
                    .setCustomId('input_ticket_desc')
                    .setLabel('Descrição')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(false);

                modal.addComponents(
                    new ActionRowBuilder().addComponents(titleInput),
                    new ActionRowBuilder().addComponents(descInput)
                );

                await interaction.showModal(modal);
            }

            if (customId === 'btn_preview') {
                const config = await configSchema.findOne({ GuildID: guild.id });
                
                const embed = new EmbedBuilder()
                    .setTitle(config?.PanelTitle || 'Atendimento (Exemplo)')
                    .setDescription(config?.PanelDescription || 'Descrição exemplo.')
                    .setColor('#2b2d31');
                
                if (config?.PanelImage) embed.setImage(config.PanelImage);

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('fake')
                            .setLabel('Abrir Ticket')
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji('📩')
                            .setDisabled(true)
                    );

                await interaction.reply({ 
                    content: '**PREVIEW DO PAINEL:**', 
                    embeds: [embed], 
                    components: [row], 
                    ephemeral: true 
                });
            }

            if (customId === 'ticket_open') {
                const data = await ticketSchema.findOne({ GuildID: guild.id, MemberID: member.id, Opened: true });
                if (data) return interaction.reply({ content: 'Você já tem um ticket aberto.', ephemeral: true });

                const channel = await guild.channels.create({
                    name: `ticket-${member.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                        { id: member.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
                        { id: client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
                    ],
                });

                await ticketSchema.create({
                    GuildID: guild.id,
                    MemberID: member.id,
                    TicketID: interaction.id,
                    ChannelID: channel.id,
                    Opened: true,
                });

                const config = await configSchema.findOne({ GuildID: guild.id });
                
                const embed = new EmbedBuilder()
                    .setTitle(config?.TicketTitle || `Olá, ${member.user.username}!`)
                    .setDescription(config?.TicketDescription || 'Aguarde o suporte.')
                    .setColor('Green');

                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('ticket_close')
                            .setLabel('Fechar Ticket')
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji('🔒')
                    );

                await channel.send({ content: `<@${member.id}>`, embeds: [embed], components: [button] });
                await interaction.reply({ content: `Ticket criado: ${channel}`, ephemeral: true });
            }

            if (customId === 'ticket_close') {
                const data = await ticketSchema.findOne({ ChannelID: interaction.channel.id });
                if (data) await ticketSchema.deleteOne({ ChannelID: interaction.channel.id });

                await interaction.reply('Fechando em 5 segundos...');
                let seconds = 5;
                const interval = setInterval(async () => {
                    seconds--;
                    if (seconds > 0) {
                        await interaction.editReply(`Fechando em ${seconds} segundos...`);
                    } else {
                        clearInterval(interval);
                        interaction.channel.delete().catch(() => {});
                    }
                }, 1000);
            }
        }

        if (interaction.isModalSubmit()) {
            const { guild } = interaction;

            if (interaction.customId === 'modal_config_panel') {
                const title = interaction.fields.getTextInputValue('input_panel_title');
                const desc = interaction.fields.getTextInputValue('input_panel_desc');
                const img = interaction.fields.getTextInputValue('input_panel_img');

                const updateData = {};
                if (title) updateData.PanelTitle = title;
                if (desc) updateData.PanelDescription = desc;
                if (img) updateData.PanelImage = img;

                await configSchema.findOneAndUpdate({ GuildID: guild.id }, updateData, { upsert: true });
                await interaction.reply({ content: 'Painel atualizado.', ephemeral: true });
            }

            if (interaction.customId === 'modal_config_ticket') {
                const title = interaction.fields.getTextInputValue('input_ticket_title');
                const desc = interaction.fields.getTextInputValue('input_ticket_desc');

                const updateData = {};
                if (title) updateData.TicketTitle = title;
                if (desc) updateData.TicketDescription = desc;

                await configSchema.findOneAndUpdate({ GuildID: guild.id }, updateData, { upsert: true });
                await interaction.reply({ content: 'Mensagem interna atualizada.', ephemeral: true });
            }
        }
    },
};