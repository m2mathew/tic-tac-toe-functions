'use strict';
/*
 * Returns the number 1 if the gameTypeString is 1 player and the number 2 if
 * the gameTypeString is 2 players. If the gameTypeString is invalid it should
 * return false.
 *
 * valid options include: '1', 'one', '2', or 'two'.
 * The function should be case insensitive, so 'one' and 'ONE' should both
 * result in 1.
 */
function validateGameType(gameTypeString) {
	if (typeof gameTypeString === "object"){
		return false;
	}
	if (gameTypeString == 1 || gameTypeString.toLowerCase() === "one") {
		return 1;
	}
	else if (gameTypeString == 2 || gameTypeString.toLowerCase() === "two") {
		return 2;
	}
	return false;
}

/*
 * Returns the players name if it is a valid name. Valid names must only contain
 * letters, hyphens or spaces and must contain at least one letter. Returns
 * false if the name is not valid.
 */
function validateName(name) {
	var singleChar = "";
	var isValid = false;

	if (typeof name === "object" || typeof name === "number" || typeof name === "boolean") {
		return false;
	}

	for (var i = 0; i < name.length; i++) {
		singleChar = name.charCodeAt(i);

		if ((singleChar === 32) || (singleChar === 45) || ((singleChar >= 65) && (singleChar <= 90)) || ((singleChar >= 97) && (singleChar <= 122))) {
			isValid = true;
		}
	}

	if (isValid === true) {
		return name;
	}
	else
		return false;
}

/*
 * Randomly generates and returns a name for a computer player.
 */
function generateComputerName() {
	var randomNumber = 0;
	var randomInt = 0;
	var cpuName = "";

	for (var i=0; i<5; i++) {
		randomNumber = Math.random()*50;
		randomInt = Math.round(randomNumber);
		cpuName = cpuName + String.fromCharCode(randomInt);
	}
	return cpuName;
}

/*
 * Converts the moveString (which should be in the format 'x y') into an object
 * with x and y properties as numbers. The x and y properties in the object
 * should be numbers that correspond to positions in the gameBoard matrix.
 *
 * For example:
 * If the moveString was '2 3' then the return value should be:
 * {
 *	  x: 1,
 *	  y: 2
 * }
 *
 * Notice that the values in the return object are one less than the input
 * values. This is because the gameBoard is zero-indexed (meaning it starts at
 * position 0 instead of position 1 so every position is one smaller than the
 * values in the moveString).
 *
 * If the moveString is not in the correct format (ie. 'x y') then the function
 * should throw an 'Invalid input: the move must be in the format "x y"'
 * exception.
 */
function parseMove(moveString) {

    if (typeof moveString === "undefined" || typeof moveString === "number" || typeof moveString === "array" || typeof moveString === "object" || moveString.length !== 3)
    	throw "Invalid input: the move must be in the format \"x y\"";

    var space = " ";
    var move = moveString.split(space);

    var x = parseInt(move[0],10);
    var y = parseInt(move[1],10);

    var moveObject = {
    	x: (x-1),
    	y: (y-1)
    }

    if (isNaN(x) || isNaN(y)) {
        throw "Invalid input: the move must be in the format \"x y\"";
    }

    return moveObject;
}

/*
 * Validate the moveObject.
 *
 * If the x and y coordinates in the moveObject are outside the game board (ie.
 * they are greater than 2 or less than 0) then the function should throw an
 * 'Invalid move: the coordinates are outside the game board' exception.
 *
 * If the position on the gameBoard associated with the x and y coordinates is
 * already taken (ie. the associated position on the game board is *not* and
 * single space) then the function should throw an 'Invalid move: that spot is
 * already taken' exception.
 *
 * If there are no errors then the function should return the move object.
 */
function validateMove(moveObject, gameBoard) {

	if ((moveObject.x < 0 || moveObject.x > 2) || (moveObject.y < 0 || moveObject.y > 2)) {
		throw "Invalid move: the coordinates are outside the game board";
	}
	else if (gameBoard[moveObject.y][moveObject.x] !== " "){
		throw "Invalid move: that spot is already taken";
	}
	else {
		return moveObject;
	}
}

/*
 * Convert the gameBoard matrix to a string. You can use \n to denote a newline
 * within a string. For a matrix like this:
 * gameBoard = [
 *     [' ', 'X', ' '],
 *     [' ', ' ', ' '],
 *     [' ', ' ', ' '],
 * ]
 * the resulting string should look like this:
 *      1   2   3
 *   ~~~~~~~~~~~~~
 * 1 |   | X |   |
 *   ~~~~~~~~~~~~~
 * 2 |   |   |   |
 *   ~~~~~~~~~~~~~
 * 3 |   |   |   |
 *   ~~~~~~~~~~~~~
 */
function getGameBoardString(gameBoard) {

	var gameBoardString = "     1   2   3 \n  ~~~~~~~~~~~~~\n1 | "+gameBoard[0][0]+" | "+gameBoard[0][1]+" | "+gameBoard[0][2]+" |\n  ~~~~~~~~~~~~~\n2 | "+gameBoard[1][0]+" | "+gameBoard[1][1]+" | "+gameBoard[1][2]+" |\n  ~~~~~~~~~~~~~\n3 | "+gameBoard[2][0]+" | "+gameBoard[2][1]+" | "+gameBoard[2][2]+" |\n  ~~~~~~~~~~~~~\n";

	return gameBoardString;
}

/*
 * Given a playerString (either 'X' or 'O'), a moveObject and a gameBoard
 * matrix, make the move on the gameBoard and return the gameBoard.
 */
function makeMove(playerString, moveObject, gameBoard) {

	if (playerString === "X") {
		gameBoard[moveObject.y][moveObject.x] = "X";
		return gameBoard;
	}
	else if (playerString === "O") {
		gameBoard[moveObject.y][moveObject.x] = "O";
		return gameBoard;
	}
}

/*
 * Return the number of empty spaces that currently exist within the gameBoard
 * matrix. This function should work regardless of the size of the game board.
 * For example, the game board might be 3x3, 4x4, or 5x7.
 */
function getEmptySpaceCount(gameBoard) {
	var spaceCount = 0;

	for (var i=0; i<gameBoard.length; i++) {

		for (var j=0; j<gameBoard[i].length; j++) {
			if (gameBoard[i][j] === " ") {
				spaceCount++;
			}
		}
	}
	return spaceCount;
}

/*
 * Return the player (either 'X' or 'O') who should go next, based on the
 * current player. If the currentPlayer is 'X' then the function should return
 * 'O' and vice versa.
 */
function getNextPlayer(currentPlayer) {

	if (currentPlayer === "X")
		return "O";
	if (currentPlayer === "O")
		return "X";
}

/*
 * Determine and return the winning player (either 'X' or 'O') based on the
 * gameBoard matrix. If there is no winner than the function should return null.
 */
function getWinner(gameBoard) {


	if ((gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2] === "XXX") || (gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0] === "XXX") || (gameBoard[0][0] + gameBoard[0][1] + gameBoard[0][2] === "XXX") || (gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2] === "XXX") || (gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2] === "XXX") || (gameBoard[0][0] + gameBoard[1][0] + gameBoard[2][0] === "XXX") || (gameBoard[0][1] + gameBoard[1][1] + gameBoard[2][1] === "XXX") || (gameBoard[0][2] + gameBoard[1][2] + gameBoard[2][2] === "XXX")) {
			return "X";
	}
	else if ( (gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2] === "OOO") || (gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0] === "OOO") || (gameBoard[0][0] + gameBoard[0][1] + gameBoard[0][2] === "OOO") || (gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2] === "OOO") || (gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2] === "OOO") || (gameBoard[0][0] + gameBoard[1][0] + gameBoard[2][0] === "OOO") || (gameBoard[0][1] + gameBoard[1][1] + gameBoard[2][1] === "OOO") || (gameBoard[0][2] + gameBoard[1][2] + gameBoard[2][2] === "OOO")) {
			return "O";
	}
	else
		return null;
}

/*
 * Validate a yes/no answer. If the yesNoString is 'y' or 'yes' then the
 * function should return true. If the yesNoString is 'n' or 'no' then the
 * function should return false. If the yesNoString is neither of those options
 * then the function should return null. The function should be case
 * insensitive, so it should accept both 'Y' and 'y' for example.
 */
function validateYesNo(yesNoString) {
	yesNoString = yesNoString.toLowerCase();

	if (yesNoString === "y" || yesNoString === "yes")
		return true;
	else if (yesNoString === "n" || yesNoString === "no")
		return false;
	else
		return null;
}

/*
 * Receives a player (either 'X' or 'O') and a game board. Returns the best move
 * for the chosen player based on the following algorithm:
 *
 * Choose the first available move:
 * 1. Win: If the player has two in a row, they can place a third to get three
 *    in a row.
 * 2. Block: If the opponent has two in a row, the player must play the third
 *    themselves to block the opponent.
 * 3. Fork: Create an opportunity where the player has two threats to win (two
 *    non-blocked lines of 2).
 * 4. Blocking an opponent's fork:
 *       Option 1: The player should create two in a row to force the opponent
 *                 into defending, as long as it doesn't result in them creating
 *                 a fork. For example, if "X" has a corner, "O" has the center,
 *                 and "X" has the opposite corner as well, "O" must not play a
 *                 corner in order to win. (Playing a corner in this scenario
 *                 creates a fork for "X" to win.)
 *       Option 2: If there is a configuration where the opponent can fork, the
 *                 player should block that fork.
 * 7. Center: A player marks the center. (If it is the first move of the game,
 *    playing on a corner gives "O" more opportunities to make a mistake and may
 *    therefore be the better choice; however, it makes no difference between
 *    perfect players.)
 * 8. Opposite corner: If the opponent is in the corner, the player plays the
 *    opposite corner.
 * 9. Empty corner: The player plays in a corner square.
 * 10 Empty side: The player plays in a middle square on any of the 4 sides.
 *
 * This strategy taken from wikipedia:
 * https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
 *
 * You may want to break this function up into more tha one other functions.
 * Perhaps one for each type of moves a player could make.
 *
 * The move should be returned as a move object with x and y properties. For
 * example: { x: 0, y: 0 }.
 */
function getComputerPlayerMove(player, gameBoard) {
	// This code just moves to the next available space instead of using the
	// algorithm outlined above.
	for(var y = 0; y < gameBoard.length; y++) {
		for(var x = 0; x < gameBoard[y].length; x++) {
			if(gameBoard[y][x] === ' ') {
				return {x: x, y: y};
			}
		}
	}
	return null;
}

/*
 * Don't mess with this code :)
 */
module.exports = {
	validateGameType: validateGameType,
	validateName: validateName,
	generateComputerName: generateComputerName,
	parseMove: parseMove,
	validateMove: validateMove,
	getGameBoardString: getGameBoardString,
	makeMove: makeMove,
	getEmptySpaceCount: getEmptySpaceCount,
	getNextPlayer: getNextPlayer,
	getWinner: getWinner,
	validateYesNo: validateYesNo,
	getComputerPlayerMove: getComputerPlayerMove
};
