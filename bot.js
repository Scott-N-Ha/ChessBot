// require the discord.js module
const Discord = require('discord.js');
const { token } = require('./auth.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(token);

// listen for messages
client.on('message', message => {
  console.log(message);
});