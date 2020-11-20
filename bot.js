// require the discord.js module
const Discord = require('discord.js');
const ChessWebAPI = require('chess-web-api');

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

// instantiate chesswebapi
const chessAPI = new ChessWebAPI();

// listen for messages
client.on('message', ({
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

  if (channel.name === 'chess' && content === '!stats') {
    // channel.send(`Pong! Bitch! ${author.username}`)

    try {
      const stats = getPlayerStats('LordBootie');
      console.log(stats)
      channel.send(`Stats for LordBootie: ${stats}`);
    } catch (error) {
      channel.send(`Error fetching stats ${error}`);
    }
  }
});

async function getPlayerStats (name) {
  let resp;

  try {
    resp = await chessAPI.getPlayer(name);
  } catch (error) {
    resp = error;
  }
  
  return resp;
}
