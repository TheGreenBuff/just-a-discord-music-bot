const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'info',
	description: 'Info command.',
	cooldown: 5,
	execute(message) {
		const newEmbed = new MessageEmbed()
		.setColor('#074d0e')
		.setTitle('Info')
		.setDescription('Music bot ${process.env.SERVER_NAME}')
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
		.setFooter('by ${process.env.DISCORD_NAME}');

		message.channel.send(newEmbed);
	}
};
