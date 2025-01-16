const { token, link, prefix } = require('./config.json');
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let reversed = false;

client.once('ready', () => { console.log('Ready'); });
client.on('messageCreate', (message) => {
    if (!message.author.bot && message.content.startsWith(prefix)) {
        switch (message.content) {
            case 'clear': {
                message.channel.bulkDelete(100);
                break;
            }
            case 'reverse': {
                message.delete();
                reversed = !reversed;
                break;
            }
    if (reversed) {
        message.channel.send(message.content.split('').reverse().join(''));
    }
});

client.login(token);
