require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Ship Calculator')
].map(command => command.toJSON());

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

(async () => {
  try {
    console.log('🔄 Deploying commands...');

    await rest.put(
      Routes.applicationCommands('1483126306035208253'),
      { body: commands }
    );

    console.log('✅ Gotowe!');
  } catch (error) {
    console.error(error);
  }
})();