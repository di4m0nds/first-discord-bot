const fs = require('fs');
// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
// client.once('ready', () => {
// 	console.log('Ready!');
// });

// Before commads -------------------------------------------------
// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;
//   const command = client.commands.get(interaction.commandName);
//   if (!command) return;
//   try {
//     await command.execute(interaction);
//   }
//  catch (err) {
//     console.error(err);
//      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//   }
// });
// --------------------------------------------------------------------

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let commandsReady = {};
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commandsReady = client.commands;
}

// Return < undefined >
console.log(`Client Commands:\n${client.commands}`);

// Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
eventFiles.map(file => {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args, commandsReady));
  }
});


// Login to Discord with your client's token
client.login(token);
