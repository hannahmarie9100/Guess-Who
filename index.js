const MoveTypes = Object.freeze({
  Question: 0,
  Answer: 1,
  Guess: 2,
  ChooseCharacter: 3
});

// TicTacToe Example
/**
 * Generic board game types
 * @type Player: json object, in the format of
 * {
 *  id: string, unique player id
 *  username: string, the player's display name
 * }
 * @type BoardGame: json object, in the format of
 * {
 *  // creator read write fields
 *  state: json object, which represents any board game state
 *  joinable: boolean (default=true), whether or not the room can have new players added to it
 *  finished: boolean (default=false), when true there will be no new board game state changes
 *
 *  // creator read only
 *  players: [Player], array of player objects
 *  version: Number, an integer value that increases by 1 with each state change
 * }
 * @type BoardGameResult: json object, in the format of
 * {
 *  // fields that creator wants to overwrite
 *  state?: json object, which represents any board game state
 *  joinable?: boolean, whether or not the room can have new players added to it
 *  finished?: boolean, when true there will be no new board game state changes
 * }
 */

/**
 * onRoomStart
 * @returns {BoardGameResult}
 */
function onRoomStart() {
  return {
    state: {
      messages: [],
      winner: null,
      characters: {},
      plrToMove: null
    }
  };
}

/**
 * onPlayerJoin
 * @param {Player} player, represents the player that is attempting to join this game
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerJoin(plr, boardGame) {
  const { state, players } = boardGame;

  if (players.length === 2) {
    return { joinable: false };
  }

  state.plrToMove = plr.id;
  state.characters = {}
  return { state };
}

// /**
//  * onPlayerMove
//  * @param {Player} player, the player that is attempting to make a move
//  * @param {*} move json object, controlled the creator that represents the player's move
//  * @param {BoardGame} currentGame
//  * @returns {BoardGameResult}
//  */
// function getPlrMark(plr, plrs) {
//   if (plr.id === plrs[0].id) { // for simplicity, the first player will be 'X'
//     return 'X';
//   }
//   return 'O';
// }

// function isEndGame(board, plrs) {
//   function getPlrFromMark(mark, plrs) {
//     return mark === 'X' ? plrs[0] : plrs[1];
//   }

//   function isWinningSequence(arr) {
//     return arr[0] !== null && arr[0] === arr[1] && arr[1] === arr[2];
//   }

//   // check rows and cols
//   for (let i = 0; i < board.length; i += 1) {
//     const row = board[i];
//     const col = [board[0][i], board[1][i], board[2][i]];

//     if (isWinningSequence(row)) {
//       return [true, getPlrFromMark(row[0], plrs)];
//     } if (isWinningSequence(col)) {
//       return [true, getPlrFromMark(col[0], plrs)];
//     }
//   }

//   // check diagonals
//   const d1 = [board[0][0], board[1][1], board[2][2]];
//   const d2 = [board[0][2], board[1][1], board[2][0]];
//   if (isWinningSequence(d1)) {
//     return [true, getPlrFromMark(d1[0], plrs)];
//   } if (isWinningSequence(d2)) {
//     return [true, getPlrFromMark(d2[0], plrs)];
//   }

//   // check for tie
//   if (board.some((row) => row.some((mark) => mark === null))) {
//     return [false, null];
//   }
//   return [true, null];
// }

function getOtherPlayer(CurPlayer, ListOfPlayers) {
  return ListOfPlayers.find(player => player.id !== CurPlayer.id)
}

function onPlayerMove(plr, move, boardGame) {
  const { state, players, finished } = boardGame;
  const { type, data } = move;

  if (type === MoveTypes.ChooseCharacter) {
    state.characters[plr.id] = data;
  } else {
    if (Object.keys(state.characters).length < 2) {
      throw new Error("Both players must select their characters first!")
    }
    if (state.plrToMove !== plr.id) {
      throw new Error("It's not your move!")
    }
    
    if (type === MoveTypes.Question) {
      state.messages.push({
        sender: plr.id,
        message: data,
        // answer: undefined
      })
  
      state.plrToMove = getOtherPlayer(plr, players).id
    } else if (type === MoveTypes.Answer) {
      state.messages.push({
        sender: plr.id,
        message: data
      })
      // state.messages[state.messages.length-1].answer = data;
    } else if (type === MoveTypes.Guess) {
      const otherPlayer = getOtherPlayer(plr, players)
      const correctGuess = data === state.characters[otherPlayer.id]
  
      state.messages.push({
        sender: plr.id,
        message: `I guess ${data}`
      },
        {
          sender: otherPlayer.id,
          message: correctGuess ? "That's right! You win!" : "No, sorry that's not right!"
        }
      )
  
      if (correctGuess) {
        state.winner = plr
  
        return { state, finished: true }
      }
  
      state.plrToMove = getOtherPlayer(plr, players).id
    }
  }

  return { state, finished }

  //   const { state, players } = boardGame;
  //   const { board, plrToMoveIndex } = state;

  //   const { x, y } = move;

  //   const plrMark = getPlrMark(plr, players);

  //   board[x][y] = plrMark;

  //   const [isEnd, winner] = isEndGame(board, players);

  //   if (isEnd) {
  //     state.winner = winner;
  //     return { state, finished: true };
  //   }
  //   return { state };
}

/*

*/

/**
 * onPlayerQuit
 * @param {Player} player, the player that is attempting to quit the game
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerQuit(plr, boardGame) {
  const { state, players } = boardGame;

  if (players.length === 1) {
    const [winner] = players;
    state.winner = winner;
    return { state, joinable: false, finished: true };
  }
  return { joinable: false, finished: true };
}

module.exports = {
  onRoomStart,
  onPlayerJoin,
  onPlayerMove,
  onPlayerQuit,
};