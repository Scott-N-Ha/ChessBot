const ChessWebAPI = require('chess-web-api');

class Chess {
  constructor() {
    this.client = new ChessWebAPI();
  }

  async getPlayerProfile (name) {
    let resp;
  
    try {
      resp = await this.client.getPlayer(name);
      resp = resp.body;

      resp = `**${resp.username}**:
      __Name__: *${resp.name}*
      __Joined__: *${new Date(Number(resp.joined))}*
      __Last Online__: *${new Date(Number(resp.last_online))}*`
    } catch (error) {
      resp = `Error Fetching Stats for ${name}: ${error}`;
    }

    return resp;
    // Returns Following On Success
    // { avatar:
    //   'https://images.chesscomfiles.com/uploads/v1/user/95274526.d29c2b50.200x200o.1828fd72681f.jpeg',
    //  player_id: 95274526,
    //  '@id': 'https://api.chess.com/pub/player/lordbootie',
    //  url: 'https://www.chess.com/member/LordBootie',
    //  name: 'Scott Ha',
    //  username: 'lordbootie',
    //  followers: 3,
    //  country: 'https://api.chess.com/pub/country/US',
    //  last_online: 1605923440,
    //  joined: 1604602342,
    //  status: 'basic',
    //  is_streamer: false }
  }

  async getPlayerStats (name) {
    let resp;
  
    try {
      resp = await this.client.getPlayerStats(name);
      const body = resp.body;

      resp = `**${name}**
      `;

      Object.keys(body).forEach((type) => {
        let formatType;

        switch(type) {
          case 'chess960_daily': formatType = '960 Daily'; break;
          case 'chess_daily': formatType = 'Daily'; break;
          case 'chess_rapid': formatType = 'Rapid'; break;
          case 'chess_bullet': formatType = 'Bullet'; break;
          case 'chess_blitz': formatType = 'Blitz'; break;
        }

        console.log('body', body)
        if (body[type] && (type !== 'fide' && type !== 'lessons' && type !== 'tactics' && type !== 'puzzle_rush')) {
          console.log(type, body[type])
          const { last, best, record } = body[type];
          const { win, loss, draw } = record;
          const rate = Math.round(win/(win + loss + draw) * 100);
          formatType += `
            Rating: **${last.rating}**
            Record: **${rate}%**
              W: ${win}
              L: ${loss}
              D: ${draw}
          `;

          resp += formatType;
        }
      });
    } catch (error) {
      resp = error;
    }

    console.log(resp)

    return resp;
    // Returns Following On Success
    // { chess_daily:
    //   { last: { rating: 2239, date: 1466716092, rd: 103 },
    //     best:
    //      { rating: 2464,
    //        date: 1397136740,
    //        game: 'https://www.chess.com/game/daily/84604826' },
    //     record:
    //      { win: 73,
    //        loss: 11,
    //        draw: 4,
    //        time_per_move: 24338,
    //        timeout_percent: 0 } },
    //  chess960_daily:
    //   { last: { rating: 1231, date: 1444458214, rd: 230 },
    //     best:
    //      { rating: 1489,
    //        date: 1397073007,
    //        game: 'https://www.chess.com/game/daily/87191830' },
    //     record:
    //      { win: 1,
    //        loss: 2,
    //        draw: 0,
    //        time_per_move: 24338,
    //        timeout_percent: 0 } },
    //  chess_rapid:
    //   { last: { rating: 2800, date: 1605895222, rd: 254 },
    //     best:
    //      { rating: 2829,
    //        date: 1588687076,
    //        game: 'https://www.chess.com/live/game/1205801326' },
    //     record: { win: 10, loss: 1, draw: 0 } },
    //  chess_bullet:
    //   { last: { rating: 3402, date: 1605912144, rd: 23 },
    //     best:
    //      { rating: 3570,
    //        date: 1605136047,
    //        game: 'https://www.chess.com/live/game/5710095242' },
    //     record: { win: 9416, loss: 1241, draw: 511 } },
    //  chess_blitz:
    //   { last: { rating: 3143, date: 1605909659, rd: 23 },
    //     best:
    //      { rating: 3332,
    //        date: 1585690331,
    //        game: 'https://www.chess.com/live/game/4448064197' },
    //     record: { win: 17049, loss: 3109, draw: 2192 } },
    //  fide: 2814,
    //  tactics:
    //   { highest: { rating: 3421, date: 1539084698 },
    //     lowest: { rating: 695, date: 1389043648 } },
    //  lessons: {},
    //  puzzle_rush: { best: { total_attempts: 79, score: 76 } } }
  }
};

module.exports = Chess;