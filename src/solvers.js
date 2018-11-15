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
  traverse the tree (iterate)
    based on first location, determine if following spaces have conflict
      set/toggle, then continue
    pop/slice/go back up the tree
    untoggle first position
      set new first
        explore conflict in following spaces
    repeat
  */
   
  var solution = new Board({n: n});
  // console.log(solution);
  var matrix = solution.rows();
  // console.log(matrix);
  var currentRow = 0;
  var currentCol = 0;
  var limit = n;
  
  // if (n === 1) {
  //   return [1];
  // }
  
  solution.togglePiece(currentRow, currentCol); // toggle 0, 0
  console.log(solution);
  var choices = function(currentRow, currentCol) {
    if (currentCol === limit && !(currentRow > n)) {
      currentRow + 1;
      currentCol = 0;
    }
   
    matrix.togglePiece(currentRow, currentCol ++); // toggle 0, 1
    
    for (var row = 0; row < limit; row ++) { 
      // for (var col = 0; col < n; col ++) {
      // if (matrix.hasAnyRooksConflicts() === false) {
      if (!matrix.hasAnyRowConflictsAt(currentRow) && !matrix.hasAnyColConflictsAt(currentCol)) {
        return choices(currentRow, currentCol);
      } else {
        matrix.togglePiece(currentRow, currentCol); // untoggle 0, 1
        return choices(currentRow, currentCol);
      }
      // }
      // if (currentCol === limit) {
      //   currentRow ++ && currentCol = 0;
      // }
    } 
  };
  choices(currentRow, currentCol);
  // console.log(matrix);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};

console.log(window.findNRooksSolution(3));

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
