const { token, prefix } = require('./config.json');
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const logFilePath = `${process.cwd()}/logs/${Date.now()}.log`;

const commands = {
    help: (message) => message.channel.send(`Available commands: ${Object.keys(commands).filter(key => typeof commands[key] === 'function').join(', ')}.`),
    ping: (message) => message.channel.send(`Latency: ${client.ws.ping}ms`),
    clear: (message, args) => message.channel.bulkDelete(parseInt(args) || 100),
    reversed: false,
    reverse: (message) => {
        message.delete();
        commands.reversed = !commands.reversed;
    },
    say: (message, args) => {
        message.delete();
        message.channel.send(args || 'NUH-UH');
    },
    about: async (message) => {
        const user = message.mentions.users.first();
        if (user) {
            const guildMember = await message.guild.members.fetch(user.id);
            message.channel.send(
                `Display Name: ${user.displayName}\n` +
                `Server Nickname: ${guildMember.nickname || user.displayName}\n` +
                `Tag: ${user.tag}\n${user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 })}`
            );
        } else {
            message.channel.send('No user specified');
        }
    }
};

client.once('ready', () => {
    console.log('Ready');
    client.user.setPresence({ status: 'idle' });
});
client.on('messageCreate', (message) => {
    if (!message.author.bot) {
        let logType = 'INFO';
        let logMessage = 'Non-command message found.'; // The message is not logged for privacy purposes
        if (message.content.startsWith(prefix)) {
            message.content = message.content.slice(prefix.length);
            const [ command, args ] = message.content.split(/\s+/, 2);
            const func = commands[command];
            if (typeof func === 'function') {
                func(message, args);
                logType = 'EXEC';
                logMessage = `Executed ${command} with arguments ${args}.`;
            } else {
                logType = 'WARN';
                logMessage = 'Undefined command.';
            }
        }
        fs.appendFile(logFilePath, `[${logType}] [${new Date().toLocaleString('en-GB', { hour12: false })}] [Eri] - ${logMessage}\n`, () => {});
        if (commands.reversed) {
            message.channel.send(message.content.split('').reverse().join(''));
        }
    }
});

client.login(token);
