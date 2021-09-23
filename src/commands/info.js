const { MessageEmbed } = require('discord.js');
const footer = 'by ' + process.env.DISCORD_NAME

module.exports = {
	name: 'info',
	description: 'Info command.',
	cooldown: 5,
	execute(message) {
		let {guild} = message;
		const desc = 'Music bot ' + guild.name
		const newEmbed = new MessageEmbed()
		.setColor('#074d0e')
		.setTitle('Info')
		.setDescription(desc)
		.addFields(
			{name: '!info', value: 'This command'},
			{name: '!play', value: 'Play a song'},
			{name: '!np', value: 'Current song'},
			{name: '!skip', value: 'Skip current song'},
			{name: '!q or !queue', value: 'Show Queue'},
			{name: '!pause', value: 'Pause current song'},
			{name: '!resume', value: 'Resume current song'},
			{name: '!volume', value: 'Change volume'},
			{name: '!stop', value: 'Disconnects the bot'}
		)
		.setFooter(footer);

		message.channel.send(newEmbed);
	}
};
