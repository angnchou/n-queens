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
  // console.log('rows:', rows);
  // console.log('board:', board);
  
  var currentRow = 0;
  var checker = false;

  var choices = function(currentRow) {
    if (currentRow === n) {
      solution = rows;
      checker = true;
      return;
    }    
    for (var currentCol = 0; currentCol < n; currentCol ++) { 
      if (checker === true) {
        break;
      }
      //console.log(board.rows());
      board.togglePiece(currentRow, currentCol);
      if (board.hasAnyRooksConflicts() === false) {
        currentRow += 1;
        choices(currentRow);
        // currentRow -= 1;
        // if (checker === false) {
        //   board.togglePiece(currentRow, currentCol);
        // }
      } else {
        board.togglePiece(currentRow, currentCol); 
      }
    } 
  };
  choices(currentRow);
  
  console.log('Single board for ' + n + ' rooks:', JSON.stringify(board));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  //var rows = board.rows();
  var row = 0;
  //var checker = false;
  var solutionCount = 0; //fixme

  var findSolutions = function(row) {
    if (row === n) {
      solutionCount++;
      return ;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        findSolutions(row + 1);
      }
      board.togglePiece(row, col);
    }
  }
  findSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //var solution = undefined; //fixme

  let board = new Board({n: n});
  let rows = board.rows();
  let solution = rows;
  // console.log('rows:', rows);
  // console.log('board:', board);

  var currentRow = 0;
  var checker = false;
  // debugger;

  var choices = function(currentRow) {
    if (currentRow === n) {
      solution = rows;
      checker = true;
      return;
    }
    
    for (var currentCol = 0; currentCol < n; currentCol ++) { 
      if (checker === true) {
        break;
      }
      board.togglePiece(currentRow, currentCol);
      //if there is no conflict
        //check the next row

      if (board.hasAnyQueensConflicts() === false) {
        currentRow += 1;
        choices(currentRow);
        currentRow -= 1;
        if (checker === false) {
          board.togglePiece(currentRow, currentCol);
        }
      } else {
        board.togglePiece(currentRow, currentCol); 
      }
    } 
  };
  choices(currentRow);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var board = new Board({n: n});
  //var rows = board.rows();
  var row = 0;
  //var checker = false;
  var solutionCount = 0; //fixme

  var findSolutions = function(row) {
    if (row === n) {
      solutionCount++;
      return ;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        findSolutions(row + 1);
      }
      board.togglePiece(row, col);
    }
  }
  findSolutions(0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
