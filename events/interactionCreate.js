module.exports = {
	name: 'interactionCreate',
	async execute(interaction, commands) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    if (!interaction.isCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    }
    catch (err) {
      console.error(err);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
	},
};
