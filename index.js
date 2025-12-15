require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.commandArray = [];

const functionFiles = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
for (const file of functionFiles) {
    require(`./src/functions/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
require('./src/database/connect')();

client.login(process.env.TOKEN);