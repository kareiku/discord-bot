const { token, prefix } = require('./config.json');
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commands = {
    help: (message) => message.channel.send('Available commands: ' + Object.keys(commands).join(', ') + '.'),
    ping: (message) => message.channel.send('Latency: ' + client.ws.ping + 'ms'),
    clear: (message, args) => message.channel.bulkDelete(parseInt(args) || 100),
    reversed: false,
    reverse: (message) => {
        message.delete();
        this.reversed = !this.reversed;
    },
    say: (message, args) => {
        message.delete();
        message.channel.send(args || "NUH-UH");
    },
    about: (message) => {
        const user = message.mentions.users.first();
        message.channel.send(user ? `Username: ${user.id}\nTag: ${user.tag}\n${user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 })}` : 'No user specified'); /* FIXME Change to nickname */
    }
};

client.once('ready', () => console.log('Ready'));
client.on('messageCreate', (message) => {
    if (!message.author.bot && message.content.startsWith(prefix)) {
        const [ command, args ] = message.content.split(/\s+/, 2);
        const func = commands[command];
        let logType = 'INFO';
        let logMessage = `Executed ${command} with arguments ${args}.`;
        if (typeof func === 'function') {
            func(message, args);
        } else {
            logType = 'WARN';
            logMessage = 'Undefined function found.';
        }
        /* FIXME Change to log file */ console.log(`[${logType}} [${new Date().toLocaleString('en-GB', { hour12: false })}] [Eri] - ${logMessage}`);
        if (commands.reversed) {
            message.channel.send(message.content.split('').reverse().join(''));
        }
    }
});

client.login(token);
