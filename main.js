const { token, prefix } = require('./config.json');
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let reversed = false;

client.once('ready', () => { console.log('Ready'); });
client.on('messageCreate', (message) => {
    const answers = {
        clear: () => message.channel.bulkDelete(100),
        reverse: () => {
            message.delete();
            reversed = !reversed;
        }
    };

    if (!message.author.bot && message.content.startsWith(prefix)) {
        const func = answers[message.content];
        if (typeof func === 'function') {
            func();
        } else {
            console.error(`[WARN] [${new Date().toLocaleString('en-GB', { hour12: false })}] [DiscordBot] - Undefined function found.`);
        }
        if (reversed) {
            message.channel.send(message.content.split('').reverse().join(''));
        }
    }
});

client.login(token);
