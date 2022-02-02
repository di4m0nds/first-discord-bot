const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anything')
		.setDescription('Replies with anything!'),
	async execute(interaction) {
		await interaction.reply('Anything its here maaan!!');
	},
};
