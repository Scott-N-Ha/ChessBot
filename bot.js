// require the discord.js module
const Discord = require('discord.js');
const ChessAPI = require('./chessapi.js');

const cAPI = new ChessAPI();

const {
  token
} = require('./auth.json');
const players = require('./players.json');

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
client.on('message', async ({
  channel,
  deleted,
  id,
  type,
  system,
  content,
  author,
  pinned,
  tts,
  nonce,
  embeds,
  attachments,
  createdTimestamp,
  editedTimestamp,
  reactions,
  mentions,
  webhookID,
  application,
  activity,
  _edits,
  flags,
  reference
}) => {

  if (channel.name === 'chess' && content[0] === '!') {
    const [command, name] = content.split(' ');
    let resp;

    switch (command) {
      case '!stats':
        resp = await cAPI.getPlayerStats(name);
        break;
      default:
        resp = 'Command not recognized';
        break;
    }

    channel.send(resp);
  }
});
