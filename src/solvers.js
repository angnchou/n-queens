/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


//next step: same row, next col
window.findNRooksSolution = function(n) {
  /*
  Recurse (row)
    for item in row
      toggle
        check for conflict
      recurse(row + 1)
        check for conflict
      toggle
    return if row >= n
  */
  let board = new Board({n: n});
  let rows = board.rows();
  let solution = rows;
  console.log('rows:', rows);
  console.log('board:', board);
  // var solution = new Board({n: n});
  // var solutionx = solution.rows();
  var currentRow = 0;
  // var currentCol = 0;
  var checker = false;
  // matrix.togglePiece(currentRow, currentCol); // toggle 0, 0
  // debugger;

  var choices = function(currentRow) {
    // if (currentRow >= n || currentCol >= n) {
    if (currentRow === n) {
      // count ++;
      solution = rows;
      checker = true;
      // solution.togglePiece(currentRow, col);
      return;
    }
    
    
    for (var currentCol = 0; currentCol < n; currentCol ++) { 
      if (checker === true) {
        break;
      }
      console.log(board.rows());
      board.togglePiece(currentRow, currentCol);
      // count++; // toggle 0, 0
      // for (var currentCol = 0; currentCol < n; currentCol ++) {
      // if (matrix.hasAnyRooksConflicts() === false) {
      // if (!board.hasRowConflictAt(currentRow) && !board.hascurrentColConflictAt(currentCol)) {
      if (board.hasAnyRooksConflicts() === false) {
        currentRow += 1;
        choices(currentRow);
        currentRow -= 1;
        if (checker === false) {
          board.togglePiece(currentRow, currentCol);
        }
      } else {
        
        // board.togglePiece(currentRow + 1, currentCol);
        board.togglePiece(currentRow, currentCol); 
        // count--;// untoggle 0, 1
        // currentRow += 1;
        // choices(currentRow);
      }
      // board.togglePiece(currentRow, col);
    } 
  };
  choices(currentRow);
  
  
  console.log('Single board for ' + n + ' rooks:', JSON.stringify(board));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
