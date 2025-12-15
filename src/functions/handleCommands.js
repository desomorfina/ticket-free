const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
            
            for (const file of commandFiles) {
              
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        try {
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                body: client.commandArray,
            });
            console.log('Comandos (/) registrados com sucesso.');
        } catch (error) {
            console.error(error);
        }
    };
};