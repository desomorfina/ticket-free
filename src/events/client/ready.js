const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logado como ${client.user.tag}`);
        console.log('Feito pelo luluzin com muito carinho');

        try {
            await client.application.fetch();
            await client.application.edit({
                description: "Feito com muito 💝 pelo luluzin"
            });
            console.log("Biografia atualizada.");
        } catch (error) {
            console.error(error);
        }

        const statusArray = [
            {
                content: 'Atendendo usuários',
                type: ActivityType.Watching,
                status: 'online'
            },
            {
                content: 'Feito por Luluzin',
                type: ActivityType.Playing,
                status: 'dnd'
            },
            {
                content: 'Gerenciando Tickets',
                type: ActivityType.Listening,
                status: 'idle'
            },
            {
                content: 'Melhor sistema de suporte',
                type: ActivityType.Competing,
                status: 'online'
            }
        ];

        let i = 0;
        setInterval(() => {
            if (i >= statusArray.length) i = 0;
            
            client.user.setPresence({
                activities: [
                    {
                        name: statusArray[i].content,
                        type: statusArray[i].type
                    }
                ],
                status: statusArray[i].status
            });
            i++;
        }, 10000);
    },
};