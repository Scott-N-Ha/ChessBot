const ChessWebAPI = require('chess-web-api');

class Chess {
  constructor() {
    // instantiate chesswebapi
    this.client = new ChessWebAPI();
  }

  async getPlayerStats (name) {
    let resp;
  
    try {
      resp = await this.client.getPlayer(name);
    } catch (error) {
      resp = error;
    }

    console.log(resp)
    
    return resp;
  }
};

module.exports = Chess;