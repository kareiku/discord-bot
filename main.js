const { token, link, prefix, imagesDir } = require('./config.json');
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let rev = false;

client.once('ready', () => { console.log('Ready'); });
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content === prefix + 'clear') message.channel.bulkDelete(100);
    else if (message.content === prefix + 'reverse') { message.delete(); rev = !rev; }
    else if (message.content.startsWith(prefix) && fs.existsSync(path.join(imagesDir, message.content.slice(prefix.length))))
        message.channel.send(randomImage(message.content.slice(prefix.length)));
    else if (rev) message.channel.send(message.content.split('').reverse().join(''));
});

function randomImage(dir) {
    try {
        dir = `${imagesDir}/${dir}`;
        const files = fs.readdirSync(path.join(__dirname, dir));
        if (files.length === 0) throw new Error();
        const file = files[Math.floor(Math.random() * files.length)];
        return { files: [new AttachmentBuilder(path.join(dir, file))] };
    } catch (err) { return 'Error: empty directory found.'; }
}

client.login(token);
