const { token, prefix } = require('./config.json');
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let reversed = false;

client.once('ready', () => { console.log('Ready'); });
client.on('messageCreate', (message) => {
    /*const answers = {
        'clear': this.clear(100);
        'reverse': this.revese();
        clear(count) {
            message.channel.bulkDelete(count);
        }
        reverse() {
            message.delete();
            reversed = !reversed;
        }
    };*/

    if (!message.author.bot && message.content.startsWith(prefix)) {
        // answers[message.content];
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
        }
        if (reversed) {
            message.channel.send(message.content.split('').reverse().join(''));
        }
    }
});

client.login(token);
