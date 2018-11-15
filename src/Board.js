// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) { ////returns true > 1 per row
      var current = this.get(rowIndex);
      var count = 0;
      // console.log(current);
      for (var i = 0; i < current.length; i++) {
        if (current[i] === 1) {
          count++;
        }
      }
      return count > 1; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {  ////returns true > 0 per row
      var matrix = this.rows();     
      //console.log('here:', Array.isArray(matrix[0]));
        for (var i = 0; i < matrix.length; i ++) {
          if (this.hasRowConflictAt(i)) {
            return true;
          }
        }
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    //find a row with conflict
      //keep track of index of 1 for each row
      //return true if > one index # is found
      
    hasColConflictAt: function(colIndex) { ////returns true for > 1 per col
      // var result = [];
      
      // console.log(this.get(colIndex));
      // var matrix = this.attributes; //object of arrays
      var current = this.rows();
      var count = 0;
      // console.log('here', current);
      // console.log(Array.isArray(matrix[colIndex]), "matrix")
      // for (var key in matrix) {
        // if (this.hasRowConflictAt(matrix[key][colIndex])) {
        //   result.push(i);
        // }
        for (var i = 0; i < current.length; i ++) {
          // for (var j = 0; j < current[i].length; j++) {
            if (current[i][colIndex] === 1) {
              count ++;
              // result.push(j);
            }
          // }
        }
        // if (count > 1) {
        //   return true;
        // }
      // for (var x = 0; x < result.length; x++) {
      //   if (result.indexOf(result[x], 1) !== -1) {
      //     return true;
        
      // return false; // fixme
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() { ////returns true for > 0 per col
      var matrix = this.rows();
      // var count = 0;
      for (var i = 0; i < matrix.length; i++) {
        // for (var j = 0; j < matrix[i].length; j++) {
          if (this.hasColConflictAt(i)) {
            return true;
          }
        // }
        // if (this.hasColConflictAt(matrix[i])) {
        //   // count++;
        //   return true;
        // }
      } 
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    //majorDiagonal -> colIndex - rowIndex;
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var index = majorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      var count = 0;
      
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
          if (this._getFirstRowColumnIndexForMajorDiagonalOn(i, j) === index && rows[i][j] === 1) {
            count++;
          }
        }
      }
      // if (this._isInBounds(i, j) && count > 1) {
      //   return true;
      // }
      return count > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
          if (this.hasMajorDiagonalConflictAt(j - i)) {
            // console.log(this.hasMajorDiagonalConflictAt(i));
            return true;
          }
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    //minorDiagonal -> colIndex + rowIndex
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var index = minorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      var count = 0;
      
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
          if (this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === index && rows[i][j] === 1) {
            count++;
          }
        }
      }
      // if (this._isInBounds(i, j) && count > 1) {
      //   return true;
      // }
      return count > 1; // fixme
      // return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
          if (this.hasMinorDiagonalConflictAt(j + i)) {
            // console.log(this.hasMajorDiagonalConflictAt(i));
            return true;
          }
        }
      }
      return false;
      // return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
