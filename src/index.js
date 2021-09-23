require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('READY!');
	client.user.setActivity('Youtube music probably');
	});
client.on('message', message => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		if(commandName == 'info'){
		const newEmbed = new Discord.MessageEmbed()
		.setColor('#304281')
		.setTitle('Info')
		.setDescription('Music bot AutismHQ!')
		.addFields(
			{name: '!info', value: 'This command'},
			{name: '!play', value: 'url or name of song'},
			{name: '!np', value: 'shows current song playing'},
			{name: '!skip', value: 'skips current song'},
			{name: '!q or !queue', value: 'shows queue'},
			{name: '!pause', value: 'pauses song'},
			{name: '!resume', value: 'resumes song'},
			{name: '!volume', value: 'changes general volume'},
			{name: '!stop', value: 'Disconnects me'}
		)
		.setFooter(':)');
		
		message.channel.send(newEmbed);
		return;
		}
	} else {
		return;
	}
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 0;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(client.config.token);
