/**
 * Generic board game types
 * @type BoardGame: json object, in the format of
 * {
 *  // creator read write fields
 *  state: json object, which represents any board game state
 *  joinable: boolean (default=true), whether or not the room can have new players added to it
 *  finished: boolean (default=false), when true there will be no new board game state changes
 *
 *  // creator read only
 *  players: [string], array of unique playerIds
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
      board: {},
      attackBoard: {},
      hitCounts: {},
      playersReady: 0,
      plrIDToMove: null,
      winner: null,
    },
  };
}

/**
 * onPlayerJoin
 * @param {string} plr string, which represents the player id
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerJoin(plr, boardGame) {
  console.log("HI")
  state.attackBoard = {"hi": 1}
  return { state }
}

/**
 * onPlayerMove
 * @param {string} plr string, which represents the player id
 * @param {*} move json object, controlled the creator that represents the player's move
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerMove(plr, move, boardGame) {
  console.log("2")
  return { }
}

/**
 * onPlayerQuit
 * @param {string} plr string, which represents the player id
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerQuit(plr, boardGame) {
  console.log("3")
  return { }
}

module.exports = {
  onRoomStart,
  onPlayerJoin,
  onPlayerMove,
  onPlayerQuit,
};