const { token, prefix } = require('./config.json');
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let reversed = false;

client.once('ready', () => { console.log('Ready'); });
client.on('messageCreate', (message) => {
    const answers = {
        help: () => message.channel.send(Object.keys(this));
        ping: () => message.channel.send('Latency: ' + client.ws.ping + 'ms'),
        clear: (args) => message.channel.bulkDelete(parseInt(args) || 100),
        reverse: () => {
            message.delete();
            reversed = !reversed;
        },
        say: (args) => {
            message.delete();
            message.channel.send(args || "nuh-uh");
        },
        about: (args) => {
        }
    };
    if (!message.author.bot && message.content.startsWith(prefix)) {
        const [ command, args ] = message.content.split(/\s+/, 2);
        const func = answers[command];
        if (typeof func === 'function') {
            func(args);
        } else {
            console.error(`[WARN] [${new Date().toLocaleString('en-GB', { hour12: false })}] [DiscordBot] - Undefined function found.`);
        }
        if (reversed) {
            message.channel.send(message.content.split('').reverse().join(''));
        }
    }
});

client.login(token);
