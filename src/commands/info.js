const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'info',
	description: 'Queue command.',
	cooldown: 5,
	execute(message) {
		if(commandName == 'info'){
		const newEmbed = new MessageEmbed()
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
};
